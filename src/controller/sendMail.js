import nodemailer from "nodemailer";
export default async function sendEmail(req, res) {
    const max = 999999;
    const min = 100000;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`otp is ${otp}`)
    const myMail = process.env.EMAIL;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: myMail,
        pass: EMAILPASS,
      },
    });
    const sendEmail = (email, token) => {
      const mailOptions = {
        from: myMail,
        to: email,
        subject: "Email verification",
        text: `your otp is ${otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error in sending email  " + error);
          return true;
        } else {
          console.log("Email sent: ");
          return false;
        }
      });
    };
    const email = req.cookies.userMail
    console.log(email)
    await sendEmail(email);
    res.cookie('otp', otp, { maxAge: 900000, httpOnly: true }); // otp cookie expires after 15 minutes
    res.render("Otp", { message: "" });
}
