import { Buffer } from "buffer";
import { createClient } from "@supabase/supabase-js";
import xml2js from "xml2js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || "";
  const base64Credentials = authHeader.split(" ")[1] || "";
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  if (
    username !== process.env.SHIPSTATION_USERNAME ||
    password !== process.env.SHIPSTATION_PASSWORD
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    return await handleGet(req, res);
  } else if (req.method === "POST") {
    return await handlePost(req, res);
  } else {
    return res.status(405).json({ error: "Method not Allowed" });
  }

  async function handleGet(req, res) {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `id, created_at, status, customer_name, customer_email, order_items (id, quantity, price_each, sku, product: products (name, price))`
      ).eq("shipped", false);
    if (error) return res.status(500).json({ error: error.message });
  //   const xmlResponse = `
  //   <?xml version="1.0" encoding="utf-8"?>
  //   <Orders>
  //       ${orders
  //         .map(
  //           (order) => `
  //           <Order>
  //               <OrderID>${order.id}</OrderID>
  //               <OrderDate>${order.created_at}</OrderDate>
  //               <OrderStatus>${order.status}</OrderStatus>
  //               <Customer>
  //                   <Name>${escapeXML(order.customer_name || "")}</Name>
  //                   <Email>${escapeXML(order.customer_email || "")}</Email>
  //               </Customer>
  //               <Items>
  //                   ${order.order_items
  //                     .map(
  //                       (item) => `
  //                       <Item>
  //                           <SKU>${item.sku || ""}</SKU>
  //                           <Name>${escapeXML(item.products?.name || "")}</Name>
  //                           <Quantity>${item.quantity}</Quantity>
  //                           <UnitPrice>${item.price_each.toFixed(2)}</UnitPrice>
  //                       </Item>
  //                   `
  //                     )
  //                     .join("")}
  //               </Items>
  //           </Order>
  //       `
  //         )
  //         .join("")}
  //   </Orders>
  // `;
    
  const builder = new xml2js.Builder({ headless: true });
    const xmlData = builder.buildObject({
        Orders: {
            Order: orders.map(order => ({
                OrderID: order.id,
                OrderNumber: order.order_number,
                OrderDate: new Date(order.created_at).toISOString(),
                OrderStatus: 'Awaiting Shipment',
                LastModified: new Date(order.updated_at).toISOString(),
                ShippingMethod: order.shipping_method,
                CustomerEmail: order.email,
                BillTo: {
                    Name: `${order.first_name} ${order.last_name}`,
                    Company: order.company || '',
                    Phone: order.phone,
                    Email: order.email
                },
                ShipTo: {
                    Name: `${order.first_name} ${order.last_name}`,
                    Address1: order.address,
                    City: order.city,
                    State: order.state,
                    PostalCode: order.zip,
                    Country: order.country
                },
                Items: {
                    Item: order.items.map(item => ({
                        SKU: item.sku,
                        Name: item.name,
                        Quantity: item.quantity,
                        UnitPrice: item.price
                    }))
                }
            }))
        }
    });

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(xmlData);

  await supabase.from("orders").update({ shipped: true }).eq("shipped", false);
  }

  async function handlePost(req, res) {
    const { order_number, tracking_number, carrier, status } = req.body;

    if (!order_number || !tracking_number || !carrier || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { error } = await supabase
      .from("orders")
      .update({ tracking_number, carrier, status })
      .eq("order_number", order_number);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: "Shipping update received" });
  }
}
