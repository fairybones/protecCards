import { Buffer } from "buffer";
import { supabase } from "../../utils/supabaseClient";

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
    return res.status(401).json({ error: "Unauthorized " });
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
      );
    if (error) return res.status(500).json({ error: error.message });

    const escapeXML = (str) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    const xmlResponse = `
    <?xml version="1.0" encoding="utf-8"?>
    <Orders>
        ${orders
          .map(
            (order) => `
            <Order>
                <OrderID>${order.id}</OrderID>
                <OrderDate>${order.created_at}</OrderDate>
                <OrderStatus>${order.status}</OrderStatus>
                <Customer>
                    <Name>${escapeXML(order.customer_name || "")}</Name>
                    <Email>${escapeXML(order.customer_email || "")}</Email>
                </Customer>
                <Items>
                    ${order.order_items
                      .map(
                        (item) => `
                        <Item>
                            <SKU>${item.sku || ""}</SKU>
                            <Name>${escapeXML(item.products?.name || "")}</Name>
                            <Quantity>${item.quantity}</Quantity>
                            <UnitPrice>${item.price_each.toFixed(2)}</UnitPrice>
                        </Item>
                    `
                      )
                      .join("")}
                </Items>
            </Order>
        `
          )
          .join("")}
    </Orders>
  `;
    res.setHeader("Content-Type", "application/xml");
    return res.status(200).send(xmlResponse);
  }

  async function handlePost(req, res) {
    const { order_number, tracking_number, carrier, status } = req.body;

    if (!order_number || !tracking_number || !carrier || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { error } = await supabase
      .from("orders")
      .update({ tracking_number, carrier, status })
      .eq("id", order_number);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: "Shipping update received" });
  }
}
