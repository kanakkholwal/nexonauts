import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import nodemailer from "nodemailer";
import handler from 'lib/handler';
import nextConnect from 'next-connect';
import jwt from "jsonwebtoken"
// import { SibApiV3Sdk, SendSmtpEmail }  from 'sib-api-v3-sdk'
// Your secret key used to sign the token
const secretKey = process.env.JWT_SECRET;
const expiresInMinutes = 30; // Token will expire after 30 minutes

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
        
        const verificationToken = generateVerificationToken({ email }, expiresInMinutes);
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
              <p><small>Token will be expired in ${expiresInMinutes} minutes</small></p>
            `,
          });
            console.log("Mail sent");
        await user.save();

        res.status(201).json({ message: 'Please verify your Email Now!!!',success:true });

    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong',success:false });
    }


}

// Function to generate a token with a specific expiration time
function generateVerificationToken(data, expiresInMinutes) {
    return jwt.sign(data, secretKey, { expiresIn: `${expiresInMinutes}m` });
  }

