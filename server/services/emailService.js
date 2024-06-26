const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;
  const mailgunDomain = process.env.MAILGUN_DOMAIN || "";

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f8f8; border-radius: 5px;">
        <tr>
          <td style="padding: 30px;">
            <h1 style="color: #008080; margin-bottom: 20px; text-align: center;">Email Verification</h1>
            <div style="background-color: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <p style="color: #444;">Hello,</p>
              <p style="color: #444;">Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
              <p style="text-align: center; margin-top: 30px;">
                <a href="${verificationLink}" style="background-color: #ff7f50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email</a>
              </p>
              <p style="color: #666; margin-top: 30px;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
              <p><a href="${verificationLink}" style="color: #008080; word-break: break-all;">${verificationLink}</a></p>
              <p style="color: #666;">If you didn't create an account, you can safely ignore this email.</p>
            </div>
            <p style="text-align: center; margin-top: 20px; color: #666;">Best regards,<br>The urid Team</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const mailgunData = {
    from: `urid <noreply@${mailgunDomain}>`,
    to: email,
    subject: "Verify Your Email Address",
    html: htmlTemplate,
  };

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

module.exports = { sendVerificationEmail };
