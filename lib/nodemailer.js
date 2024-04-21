var nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADD,
      pass: process.env.EMAIL_KEY
    }
})


const sendEmail = (data) => {
    var from = 'no-reply@dj.com'
    var subject = `User Data`
    var html = `
        <h2>Hi there </h2>
        <p>${JSON.stringify(data)}
        </p>
    `
    var mailOptions = {
        from: from,
        to: data.email,
        subject: subject,
        html:html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
        response.redirect("/")
    })
}


module.exports = sendEmail;