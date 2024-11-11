import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      request,
      zipcode,
      contact,
      name,
      product,
      method,
    } = req.body;
    const isWholesaleForm = !!firstName && !!lastName;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "acromentllc@gmail.com",
      subject: isWholesaleForm ? "New Wholesale Request" : "Warranty Request",
      text: isWholesaleForm
        ? `You have a new wholesale inquiry!\n\n
            From: ${firstName} ${lastName}\n
            Contact: ${email}\n
            Details: ${request}\n
            Shipping To: ${zipcode}`
        : `Warranty Request:\n\n
            Name on Order: ${name}\n
            Contact: ${contact}\n
            Product Affected: ${product}\n
            Preferred Method of Reconcilliation: ${method}`,
    };
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
