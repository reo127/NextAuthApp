import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs"


export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        // create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Update token to database
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        // Transpoter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "186c8523fcc99a",
                pass: "78572cc391624c"
            }
        });

        // Email options
        var mailOptions = {
            from: "help@codegurukul.com",
            to: email,
            subject: emailType === "VERIFY" ? "Varify your email" : "Reset your passwrod",
            html: `
                <h1>${emailType === "VERIFY" ? "Varify your email" : "Reset your passwrod"}</h1>
                <p>Click the link below to ${emailType === "VERIFY" ? "Varify your email" : "Reset your passwrod"}</p>
                <a href="http://localhost:3000/verifyemail?token=${hashedToken}">${emailType === "VERIFY" ? "Varify" : "Reset"}</a>
                or copy and paste the link below in your browser. <br> http://localhost:3000/verifyemail?token=${hashedToken}</p>
            `
        }

        // Send email
        const mailResponce = await transport.sendMail(mailOptions)
        return mailResponce;


    } catch (error:any) {
        throw new Error(error.message)
    }
}