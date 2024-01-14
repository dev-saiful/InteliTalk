import dotenv from "dotenv/config";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid"

export const mailSend = async(doc)=>{
    try
    {
        // create a SMTP transport service
        let transporter = nodemailer.createTransport(nodemailerSendgrid({
            apiKey:process.env.SENDGRID_API_KEY
        }));
        
        // Send a mail
        const info = await transporter.sendMail({
            from:"saifulcseian@gmail.com",
            to:doc.email,
            subject:"Registered Successfully",
            html:`<p>Now, you can login with these credientials</p><br>
                    <p>Username: ${doc.email}</p>
                    <p>Password: 123456 </p>
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
    }
        

}