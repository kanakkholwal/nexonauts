import nodemailer from "nodemailer";

export function transport() {

    const _transport = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        // secure: true,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    })
    console.log("Transporter created");

    return _transport
}
function onError(err, req, res, next) {
    console.error(err);
    res.status(500).end(err.toString());
}

const handler = {
    onError: onError,
    onNoMatch: (req, res) => {
        res.status(404).send("Page is not found");
    },
}


export default handler