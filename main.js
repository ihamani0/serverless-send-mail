import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function ({ req, res, log, error }) {
  try {

    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      error("RESEND_API_KEY is not set");
      return res.json({ success: false, error: "API key not configured" });
    }

    log("Request received");

     // Validate request body
     if (!req.bodyJson) {
      error("No request body provided");
      return res.json({ success: false, error: "No request body provided" });
    }

    const { firstName, lastName, phoneNumber, email, message } = req.bodyJson;

     // Validate required fields
     if (!firstName || !lastName || !email || !message) {
      error("Missing required fields");
      return res.json({ success: false, error: "Missing required fields" });
    }

    log("Attempting to send email with data:", JSON.stringify(req.bodyJson));

    const { data, error: resendError } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "issam.ess556@gmail.com",
      subject: "Hello Portfolio",
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phoneNumber || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (resendError) {
      error("Resend error:", JSON.stringify(resendError));
      return res.json({ success: false, error: resendError });
    }

    log("Email sent successfully:", JSON.stringify(data));
    return res.json({ success: true, data });

  } catch (err) {
    error("Unexpected error:", err.message, err.stack);
    return res.json({ success: false, error: err.message });
  }
}


