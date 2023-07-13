import handler from 'lib/handler';
import User from "models/user";
import App from 'models/app';
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';
import AppsList from 'lib/apps';
import { Configuration, OpenAIApi } from "openai";
// import type { TextCompletionResponse } from "types/openai";

export default nextConnect(handler)
    // .use(hasTokenMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();
            const { userId, appId, appData } = req.body;
            if (!appData || !appId || !userId) {
                return res.status(401).json({ message: 'All fields are required!!' });
            }
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' });
            }

            // const result = await checkUser(req, existingUser);
            // if (!result.verified) {
            //   return res.status(404).json({ verified: result.verified, message: result.message });
            // }

            // check if app exists
            const _app = await App.findOne({
                appId: appId,
            }).select("+usage");

            if (!_app) {
                return res.status(404).json({ message: 'App not found!' });
            }
            // check if app is enabled
            if (!_app.enabled) {
                return res.status(404).json({ message: 'App is not enabled!' });
            }
            // check if app state is published
            if (_app.state !== "published") {
                return res.status(404).json({ message: 'App is not published!' });
            }
            // check if app has customFunction 
            if (_app.customFunction === true) {
                const app = AppsList.find((app) => app.appId === _app.appId);
                if (!app) {
                    return res.status(404).json({ message: 'App is not available!' });
                }
                const configuration = new Configuration({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                const openai = new OpenAIApi(configuration);

                const resultData = await app.execute(appData, openai);
                // update usage
                _app.usage.push({ userId: existingUser._id, appId: _app.appId, createdAt: Date.now(), usage: appData });
                await _app.save();
                return res.status(200).json({ result: resultData, message: "Output generated successfully" });

            }
            else if (_app.customFunction === false) {
                // execute app with App Data 
                const configuration = new Configuration({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                const openai = new OpenAIApi(configuration);
                const { prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, model } = _app.config;

                const calculatedPrompt = prompt.replace(/{{appData}}/g, appData);
                console.log(calculatedPrompt);

                const completion = await openai.createCompletion({
                    model: model,
                    prompt: prompt,
                    temperature: parseFloat(temperature), //1.0
                    max_tokens: parseInt(max_tokens), //500
                    top_p: parseFloat(top_p), //1.0
                    frequency_penalty: parseFloat(frequency_penalty), //0.0
                    presence_penalty: parseFloat(presence_penalty) //0.0
                });
                const response = completion.data;

                console.log(response);
                // update usage
                _app.usage.push({ userId: existingUser._id, appId: _app.appId, createdAt: Date.now(), usage: appData });
                await _app.save();
                return res.status(200).json({ result: [{
                    data: response.choices[0].text,
                    outputType:"plaintext"
                }], message: "Output generated successfully" });
            } else {
                return res.status(401).json({ message: 'Something went wrong!.' });
            }




        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })