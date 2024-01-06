import dotenv from "dotenv/config";
import nodemailer from "nodemailer";

export const mailSend = async(doc)=>{
    try
    {
        // create a SMTP service account
        nodemailer.createTestAccount((err,account)=>{
            if (err)
            {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }
        });
        // create a SMTP transport service
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'olaf26@ethereal.email',
                pass: 'anrcK7CENCRAaPeBAJ'
            }
        });

        // Send a mail
        const info = await transporter.sendMail({
            from:"Sonargaon University Bot",
            to:doc.email,
            subject:"Registered Successfully",
            html:`<p>Now, you can login with these credientials</p><br>
                    <p>Username:${doc.email}</p>
                    <p>Password:123456</p>
                `,
        });
        if(!info)
        {
            console.log("Check credientials");
        }
    }
    catch(error)
    {
        console.log(error);
        return resizeBy.status(500).json({
            success:false,
            message:"Something went wrong while sending email",
        });
        
    }
        

}