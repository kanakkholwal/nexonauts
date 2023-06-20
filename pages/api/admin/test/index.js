import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
  .get(async (req, res) => {
    try {
      await dbConnect();

      

        return res.status(200).json({ message: 'User verified successfully' });
      
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: err.message || "Something went wrong",
      });
    }
  })