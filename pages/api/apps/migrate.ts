import handler from 'lib/handler';
import App from "models/app";
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            // await dbConnect();
            const apps = await App.find({}).exec();
            // upgrade each to new schema
            apps.forEach(async (app) =>{
                // customFunction -> hasCustomFunction ,state -> status, enabled -> isPublic , recommended -> isRecommended ,
                // inputType -> type ,inputLabel -> label ,inputPlaceholder -> placeholder ,inputRequired -> required ,inputOptions -> options ,inputValue -> value ,
                // write code now 
                // app.hasCustomFunction = app.customFunction;
                app.status = app.state;
                // app.isPublic = app.enabled;
                // app.isRecommended = app.recommended;
                // console.log(app.formFlow.inputs)
                // app.formFlow.inputs.forEach((input) => {
                //     input.type = input.inputType;
                //     input.label = input.inputLabel;
                //     input.placeholder = input.inputPlaceholder;
                //     input.required = input.inputRequired;
                //     input.options = input.inputOptions;
                //     input.value = input.inputValue;
                // })
                // save app
                await app.save();

            })
        

            // return application
            return res.status(200).json({ message:"App migrated successfully" ,success:true});


        }
        catch (error) {
            console.error('Data migration error:', error);
            res.status(500).json({ error: 'Data migration failed' });
        }
    })