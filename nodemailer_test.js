const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crepcea@gmail.com",
    pass: "crepcea",
  },
});

const mailOptions = {
  from: "crepcea@gmail.com",
  to: "robertnegre16@gmail.com", 
  subject: "Test Email",
  html: "<p>Hello, this is a test email!</p>",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
