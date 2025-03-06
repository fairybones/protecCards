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
  console.log("Auth Header:", req.headers.authorization);
  console.log("All Req Headers:", req.headers);
  const [username, password] = credentials.split(":");
  console.log("ShipStation Username:", process.env.SHIPSTATION_USERNAME);
  console.log("ShipStation Password:", process.env.SHIPSTATION_PASSWORD);
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
    console.log("ShipStation GET");
    
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `id, created_at, status, customer_name, customer_email, order_items (id, quantity, price_each, sku, product: products (name, price))`
      ).eq("shipped", false);
    if (error) return res.status(500).json({ error: error.message });
 
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
                  Item: Array.isArray(order.order_items) ? order.order_items.map(item => ({
                      SKU: item.sku,
                      Name: item.product?.name || "",
                      Quantity: item.quantity,
                      UnitPrice: item.price_each.toFixed(2)
                  })) : []
              }
            }))
        }
    });

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(xmlData);
  }

  async function handlePost(req, res) {
    console.log("ShipStation POST");

    const { order_number, tracking_number, carrier, status } = req.body;

    if (!order_number || !tracking_number || !carrier || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const validStatus = ["Shipped", "Delivered", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const { error } = await supabase
      .from("orders")
      .update({ tracking_number, carrier, status, shipped: status === "Shipped" })
      .eq("order_number", order_number);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: "Shipping update received" });
  }
}
