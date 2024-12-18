import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { type, formData } = req.body;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions;

        if (type === "wholesale") {
            const { firstName, lastName, email, request, zipcode } = formData;
            mailOptions = {
                from: email,
            to: "acromentllc@gmail.com",
            subject: "Wholesale Request",
            text: `Customer Name: ${firstName} ${lastName}\n\nEmail: ${email}\nShipping to: ${zipcode}\nRequest: ${request}`,
            };
        } else if (type === "warranty") {
            const { name, email, product, method } = formData;
            mailOptions = {
                from: email,
                to: "acromentllc@gmail.com",
                subject: "Warranty Request",
                text: `Name on Order: ${name}\nEmail: ${email}\nProduct Affected: ${product}\nPreferred Method of Reconciliation: ${method}`,
            };
        } else {
            return res.status(400).json({ error: "Invalid request type." });
        }

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Email sent successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to send email." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}