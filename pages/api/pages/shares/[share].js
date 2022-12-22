// import db from "@/libs/firebase.js";
import db from "../../../../src/libs/firebase";

export default async (req, res) => {
    // increment the shares
    if (req.method === 'POST') {
        const ref = db.ref('pages/shares').child(req.query.share)
        const { snapshot } = await ref.transaction((currentShares) => {
            if (currentShares === null) {
                return 1
            }


            return currentShares + 1
        })


        return res.status(200).json({
            total: snapshot.val(),
        })
    }


    // fetch the shares
    if (req.method === 'GET') {
        const snapshot = await db.ref('pages/shares').child(req.query.share).once('value')
        const shares = snapshot.val()


        return res.status(200).json({ total: shares })
    }
}