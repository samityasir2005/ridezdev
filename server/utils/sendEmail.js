const mg = require("../config/mailgun");

const sendVerificationEmail = async (email, verificationToken) => {
  const mailgunDomain = process.env.MAILGUN_DOMAIN || "";

  const data = {
    from: `urid <noreply@${mailgunDomain}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}">Verify Email</a>
    `,
  };

  try {
    const response = await mg.messages.create(mailgunDomain, data);
    console.log("Email sent:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendVerificationEmail };
