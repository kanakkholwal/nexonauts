import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.post(async (req, res) => {
    try {
        await dbConnect();

        console.log(req.body.id);

        await Page.findOneAndDelete({ _id: req.body.id });
        res.status(200).json({ message: 'All pages deleted' });
     
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).json({ message: err.message ?? 'Server error' });
    }
});
// path : 
