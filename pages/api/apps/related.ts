import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import App from "models/app";
import type { App as AppType } from "types/app";
import { isAdminMiddleware } from 'middleware/checkUser';

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            await dbConnect();
            // find all enabled apps
            const apps = await App.find({ enabled: true }) as AppType[];
            if (apps === null || apps === undefined || apps.length === 0) {
                return res.status(403).json({ message: `No apps found!` });
            }
            // sort apps on the basis of recommended , usage , rating and reviews
            const sortedApps = apps.sort((a:AppType,b:AppType) =>{
                if(a.recommended > b.recommended){
                    return -1;
                }
                else if(a.recommended < b.recommended){
                    return 1;
                }
                else{
                    if(a.usage > b.usage){
                        return -1;
                    }
                    else if(a.usage < b.usage){
                        return 1;
                    }
                    else{
                            if (a.reviews.length > b.reviews.length) {
                                return -1;
                            }
                            else if (a.reviews.length < b.reviews.length) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                    }
                }
            });

            // return application
            return res.status(200).json({ 
                message:"Apps fetched successfully" ,
                result:sortedApps,
                success:true
             });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
  