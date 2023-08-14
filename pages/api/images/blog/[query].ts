import nextConnect from 'next-connect';
import handler from 'lib/handler';


export default nextConnect(handler)
.get(async (req, res) => {

    return res.status(200).json({message: 'hello world'})

})