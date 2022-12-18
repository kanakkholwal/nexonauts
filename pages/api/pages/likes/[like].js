// import db from "@/libs/firebase";
import db from "../../../../src/libs/firebase";

export default async (req, res) => {
    // increment the like
    if (req.method === 'POST') {
        const ref = db.ref('pages/likes').child(req.query.view)
        const { snapshot } = await ref.transaction((currentLike) => {
            if (currentLike === null || currentLike === 0) {
                return 1
            }


            return currentLike + 1
        })


        return res.status(200).json({
            total: snapshot.val(),
        })
    }
    if (req.method === 'DELETE') {
        const ref = db.ref('pages/likes').child(req.query.view)
        const { snapshot } = await ref.transaction((currentLike) => {
            if (currentLike === null || currentLike === 0) {
                return 0
            }


            return currentLike - 1
        })


        return res.status(200).json({
            total: snapshot.val(),
        })
    }
    // fetch the like
    if (req.method === 'GET') {
        const snapshot = await db.ref('pages/likes').child(req.query.view).once('value')
        const like = snapshot.val()
        return res.status(200).json({ total: like })
    }
}