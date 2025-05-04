import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function ({ req, res, log, error }) {
  try {
    log("req is ", req);
    const { firstName, lastName, phoneNumber, email, message } = req.bodyJson;

    const { data, err } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "issam.ess556@gmail.com",
      subject: "Hello Portfolio",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (err) {
      error("Resend error:", err);
      return res.json({ success: false, err });
    }

    log("Email sent:", JSON.stringify(data));
    log("Headers:", JSON.stringify(req.headers));
    log("Request from host:", req.host);

    return res.json({ success: true, data });
  } catch (err) {
    error("Function Error:", err);
    return res.json({ success: false, error: err.message });
  }
}


