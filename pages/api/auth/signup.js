import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import nodemailer from "nodemailer";
import handler from 'lib/handler';
import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
// import { SibApiV3Sdk, SendSmtpEmail }  from 'sib-api-v3-sdk'

export default nextConnect(handler)
    .post(createUser)

// Your secret key used to sign the token
const secretKey = process.env.JWT_SECRET;
const expiresInMinutes = 30; // Token will expire after 30 minutes

async function createUser(req, res) {

    const { name, email, password } = req.body;
    try {
        await dbConnect();

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const isEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!isEmail(email)) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }


        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // if (req.body.role && !req.body.role.includes("user")) {
        //     return res.status(400).json({ message: 'Role must be user' });
        // }
        // if (req.body.role.includes("admin") && !isAdminMiddleware(req, res)) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }
        const verificationToken = await generateVerificationToken({ email }, expiresInMinutes);

        const newUser = new User({ 
            name,
            email,
            password,
            role: "user",
            account_type: "free",
            verificationToken: verificationToken,
        });
        // console.log({
        //     email: process.env.MAIL_EMAIL,
        //     password: process.env.MAIL_PASSWORD
        // });
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
            to: newUser.email,
            subject: 'Verify Your Account',
            html: `
              <p>Hello ${newUser.name},</p>
              <p>Please verify your account by clicking the following link:</p>
              <a href="https://kkupgrader.eu.org/verify-user?token=${verificationToken}">
                Verify Account
              </a>
              <p><small>Token will be expired in ${expiresInMinutes} minutes</small></p>
            `,
          });
            console.log("Mail sent");
        await newUser.save();

        res.status(201).json({ message: 'Created user Successfully, Please verify your Email Now!!!', success:true });

    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }


}

// Function to generate a token with a specific expiration time
function generateVerificationToken(data, expiresInMinutes) {
    return jwt.sign(data, secretKey, { expiresIn: `${expiresInMinutes}m` });
  }



// Function to verify the token and return the data if valid
function verifyVerificationToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // Token verification failed or expired
    return null;
  }
}

