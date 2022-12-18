// import db from "@/libs/firebase.js";
import db from "../../../../src/libs/firebase";

export default async (req, res) => {
    // increment the views
    if (req.method === 'POST') {
        const ref = db.ref('pages/views').child(req.query.view)
        const { snapshot } = await ref.transaction((currentViews) => {
            if (currentViews === null) {
                return 1
            }


            return currentViews + 1
        })


        return res.status(200).json({
            total: snapshot.val(),
        })
    }


    // fetch the views
    if (req.method === 'GET') {
        const snapshot = await db.ref('pages/views').child(req.query.view).once('value')
        const views = snapshot.val()


        return res.status(200).json({ total: views })
    }
}