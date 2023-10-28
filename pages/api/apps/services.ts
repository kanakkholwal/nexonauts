import axios from 'axios';
import AppsList from 'lib/apps';
import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import App, { Usage } from 'models/app';
import User from "models/user";
import nextConnect from 'next-connect';
import { Configuration, OpenAIApi } from "openai";
// import type { TextCompletionResponse } from "types/openai";

export default nextConnect(handler)
    .use(hasTokenMiddleware)
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

            const result = await checkUser(req, existingUser);
            if (!result.verified) {
                return res.status(404).json({ verified: result.verified, message: result.message });
            }

            // check if app exists
            const _app = await App.findOne({
                appId: appId,
            }).select("+usage");

            if (!_app) {
                return res.status(404).json({ message: 'App not found!' });
            }
            // check if app is enabled
            if (!_app.isPublic) {
                return res.status(404).json({ message: 'App is not enabled!' });
            }
            // check if app state is published
            if (_app.status !== "published") {
                return res.status(404).json({ message: 'App is not published!' });
            }
            // check if app has customFunction 
            if (_app.hasCustomFunction === true) {
                const app = AppsList.find((app) => app.appId === _app.appId);
                if (!app) {
                    return res.status(404).json({ message: 'App is not available!' });
                }
                const configuration = new Configuration({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                const openai = new OpenAIApi(configuration);

                const resultData = await app.execute(appData, openai);
                console.log(resultData);
                // update usage
                // _app.usage.push({ userId: existingUser._id, appId: _app.appId, createdAt: Date.now(), usage: appData });
                // await _app.save();
                // await Usage.create({
                //     userId: existingUser._id,
                //     appId: _app.appId,
                //     createdAt: Date.now(),
                //     data: appData,
                //     usage: null
                // });
                return res.status(200).json({ result: resultData, message: "Output generated successfully" });

            }
            else if (_app.hasCustomFunction === false) {
                // execute app with App Data 
                // const configuration = new Configuration({
                //     apiKey: process.env.OPENAI_API_KEY,
                // });
                // const openai = new OpenAIApi(configuration);
                // const { prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, model } = _app.config;

                // const calculatedPrompt = prompt.replace(/{{appData}}/g, appData);
                // console.log(calculatedPrompt);

                // const completion = await openai.createCompletion({
                //     model: model,
                //     prompt: calculatedPrompt,
                //     temperature: parseFloat(temperature), //1.0
                //     max_tokens: parseInt(max_tokens), //500
                //     top_p: parseFloat(top_p), //1.0
                //     frequency_penalty: parseFloat(frequency_penalty), //0.0
                //     presence_penalty: parseFloat(presence_penalty) //0.0
                // });
                const response = await OpenAI(_app.config, appData) as any;

                console.log(response.data);
                // update usage
                // _app.usage.push({ userId: existingUser._id, appId: _app.appId, createdAt: Date.now(), usage: appData });
                
                await Usage.create({
                    userId: existingUser._id,
                    appId: _app.appId,
                    createdAt: Date.now(),
                    data: appData,
                    usage: response.usage
                });
                return res.status(200).json({
                    result: [{
                        data: response.choices[0].text,
                        outputType: "plaintext"
                    }], message: "Output generated successfully"
                });
            } else {
                return res.status(401).json({ message: 'Something went wrong!.' });
            }




        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
async function OpenAI(configuration: any, appData: any) {
    const { prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, model } = configuration;

    // convert appData to key - value pair in string 
    const _appData = Object.keys(appData).map((key) => `${key}=${appData[key]}`).join("\n");
    // console.log(_appData);


    const calculatedPrompt = prompt.concat("\n" + _appData);
    // console.log(calculatedPrompt);

    const url = (() => {
        switch (model) {
            case "davinci":
                return "https://api.openai.com/v1/engines/davinci/completions";
            case "curie":
                return "https://api.openai.com/v1/engines/curie/completions";
            case "babbage":
                return "https://api.openai.com/v1/engines/babbage/completions";
            case "ada":
                return "https://api.openai.com/v1/engines/ada/completions";
            case "cushman":
                return "https://api.openai.com/v1/engines/cushman/completions";
            case "davinci-instruct-beta":
                return "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
            case "content-filter-alpha-c4":
                return "https://api.openai.com/v1/engines/content-filter-alpha-c4/completions";
            case "davinci-codex":
                return 'https://api.openai.com/v1/engines/davinci-codex/completions';
            default:
                return "https://api.openai.com/v1/completions";
        }
    })()
    const data = JSON.stringify({
        model: model,
        prompt: calculatedPrompt,
        temperature: parseFloat(temperature), //1.0
        max_tokens: parseInt(max_tokens), //500
        top_p: parseFloat(top_p), //1.0
        frequency_penalty: parseFloat(frequency_penalty), //0.0
        presence_penalty: parseFloat(presence_penalty) //0.0
    });
    const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url, data, { headers });
            // console.log(response.data);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    })
}