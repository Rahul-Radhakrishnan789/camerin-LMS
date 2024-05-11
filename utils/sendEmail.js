const nodemailer = require('nodemailer')



module.exports = {




    sendEmailToUser: async (user) => {
        console.log(user,"this is from nodemailer");

        const email = user

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
            requireTLS: true,
            logger: true
        })

        const info = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: `Reminder for return book`,
            html: `<h4>Dear student,</h4>
            <p>This is to acknowledge mail to the details of your last day book submision</p>
            
            
            <p>Thank you for your purchase. If you have any queries, contact the library department.</p>
            <p>Best regards,</p>
            <h4>Department of Library</h4>
            `,
            
            headers: { 'x-myheader': 'test header' }
        })


        if (info.accepted.includes(email)) return true
        else return false

    }
}