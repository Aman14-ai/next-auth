const nodemailer = require("nodemailer");
import User from "@/src/models/userMode";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedId = await bcrypt.hash(userId.toString(), salt);

        // set token for particular email type
        if (emailType == "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedId,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            })
        }
        else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedId,
                    forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
                }
            )
        }
        const updatedUser = await User.findById(userId);
        console.log("Updated user with verifyToken:", updatedUser);

        // create transporter
        // Looking to send emails in production? Check out our Email API/SMTP product!
        // const transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "59a8d0c20bc8a5",
        //         pass: "54874e9e160284"
        //     }
        // });
        const transport  = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"amancode2005@gmail.com",
                pass: "pacj dust ewgu nbyj"
            }
        })
        // set email options
        const mailOptions = {
            from: "amancode2005@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN!}/verifyEmail?token=${hashedId}">here</a> to ${emailType == "VERIFY" ? "verify your Email." : "Reset your password."}</p>`
        }

        // send email
        const info = await transport.sendMail(mailOptions);
        return {info};
    }
    catch (error: any) {
        console.error("Error sending email:", error?.message);
        throw new Error("Failed to send email");
    }
}

