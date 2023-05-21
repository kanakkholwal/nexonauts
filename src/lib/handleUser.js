import nodemailer from "nodemailer";
import User from 'models/user';

export async function sendVerificationMail(email) {
    // Send verification email after user creation

    const verificationToken = Math.random().toString(36).substring(7);
    const user = await User.updateOne(
        { email: email },
        {
            $set: {
                verificationToken: verificationToken,
            },
        }
    );

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        user: 'your-smtp-username',
        pass: 'your-smtp-password',
      },
    });

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
  }
