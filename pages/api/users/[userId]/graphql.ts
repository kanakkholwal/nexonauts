import handler from 'lib/handler';
// import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
  .use(hasTokenMiddleware)
  .get(async (req, res) => {
    try {
    //   await dbConnect();

      const { userId } = req.query;
      

      return res.status(200).json({ 
        message: "success",
        data: {
            userId,
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: err.message || "Something went wrong",
      });
    }
  })
