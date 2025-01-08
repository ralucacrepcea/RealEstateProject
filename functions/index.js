const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crepcearalucamaria1@gmail.com",
    pass: "cacm agib tuay lsve"
  },
});

exports.sendOrderEmail = onDocumentCreated("Buyer-info/{docId}", async (event) => {
  const orderData = event.data.data();
  console.log("New order created:", orderData);

  if (!orderData.BuyerName || !orderData.BuyerEmail) {
    console.error("Missing required fields.");
    return;
  }

  const message = `
    <p>Hello ${orderData.BuyerName},</p>
    <p>Thank you for placing your order!</p>
    <p><strong>Your Details:</strong></p>
    <ul>
      <li><strong>Email:</strong> ${orderData.BuyerEmail}</li>
      <li><strong>Phone:</strong> ${orderData.BuyerCell}</li>
      <li><strong>Total Payment:</strong> $${orderData.BuyerPayment}</li>
    </ul>
    <p>Our team will contact you as soon as possible.</p>
  `;

  const mailOptions = {
    from: "crepcearalucamaria1@gmail.com",
    to: orderData.BuyerEmail,
    subject: "Real Estate Order Confirmation",
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
