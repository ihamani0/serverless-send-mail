import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function (req, res) {
  try {
    const { firstName, lastName , phoneNumber ,  email, message } = JSON.parse(req.body);

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'issamedhamani@outlook.com',
        subject: 'Hello Portfolio',
        html: `
        <p><strong>Name:</strong> ${firstName}${lastName}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
      })

  } catch (error) {
    console.error("Function Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
