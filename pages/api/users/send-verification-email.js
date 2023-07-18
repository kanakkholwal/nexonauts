import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import nodemailer from "nodemailer";
import handler from 'lib/handler';
import nextConnect from 'next-connect';

// import { SibApiV3Sdk, SendSmtpEmail }  from 'sib-api-v3-sdk'

export default nextConnect(handler)
    .post(sendVerificationEmail)

async function sendVerificationEmail(req, res) {

    const { email} = req.body;
    try {
        await dbConnect();

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const isEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }


        const user = await User.findOne({ email: email }).select('name email account_type role verificationToken');

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        
        const verificationToken = Math.random().toString(36).substring(7);
        user.verificationToken = verificationToken;
        await user.save();
        
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            // secure: true,
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD
            }
        })
      
        console.log("Transporter created");

          await transporter.sendMail({
            from: 'no_reply@kkupgrader.eu.org',
            to: user.email,
            subject: 'Verify Your Account',
            html: `
              <p>Hello ${user.name},</p>
              <p>Please verify your account by clicking the following link:</p>
              <a href="https://kkupgrader.eu.org/verify-user?token=${verificationToken}">
                Verify Account
              </a>
            `,
          });
            console.log("Mail sent");
        await newUser.save();

        res.status(201).json({ message: 'Please verify your Email Now!!!', user: user });

    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }


}

