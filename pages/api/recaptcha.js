import axios from "axios";
import handler from "lib/handler";
import nextConnect from "next-connect";

export default nextConnect(handler).post(async (req, res) => {
  try {
    const { token } = req.body;

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const { data } = await axios.post(verificationUrl);

    if (data.success) {
      return res
        .status(200)
        .json({ message: "Success", verified: data.success, ...data });
    } else {
      return res
        .status(400)
        .json({ message: "Failed", verified: data.success });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
});
