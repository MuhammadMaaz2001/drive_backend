export const sendEmail = async (to, subject, message) => {
    console.log(`Email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    // 🧪 For dev, just log it. For real-world: nodemailer or Mailgun
  };
  