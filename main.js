import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function ({ req, res, log }) {
  try {
    const { firstName, lastName, phoneNumber, email, message } = JSON.parse(req.body);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "issamedhamani@outlook.com",
      subject: "Hello Portfolio",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (error) {
      log("Resend error:", error);
      return res.json({ success: false, error });
    }

    log("Email sent:", JSON.stringify(data));
    log("Headers:", JSON.stringify(req.headers));
    log("Request from host:", req.host);

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Function Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
