import axios from 'axios';
import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import { Usage } from 'models/app';
import User from "models/user";
import nextConnect from 'next-connect';
import { Configuration, OpenAIApi } from 'openai';
// import type { TextCompletionResponse } from "types/openai";

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();
            const { userId, appId, appInputs, config } = req.body;
            if (!appInputs || !appId || !userId || !config) {
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


            // execute app with App Data 
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);

            const calculatedPrompt = replaceWords(config.prompt, appInputs);
            console.log(calculatedPrompt);

            const completion = await openai.createCompletion({
                model: config.model,
                prompt: calculatedPrompt,
                // temperature: parseFloat(config.hyperparameters["temperature"] ?? 1), //1.0
                // max_tokens: parseInt(config.hyperparameters["max_tokens"] ?? 500), //500
                // top_p: parseFloat(config.hyperparameters["top_p"] ?? 1), //1.0
                // frequency_penalty: parseFloat(config.hyperparameters["frequency_penalty"] ?? 0), //0.0
                // presence_penalty: parseFloat(config.hyperparameters["presence_penalty"] ?? 0) //0.0
            });

            console.log(completion.data);
    
            await Usage.create({
                userId: existingUser._id,
                appId: appId,
                createdAt: Date.now(),
                data: appInputs,
                usage: completion.data.usage,
                type: "playground"
            });
            return res.status(200).json({
                result: {
                    data: completion.data.choices[0].text,
                    outputType: "plaintext"
                },
                message: "Output generated successfully in playground mode!"
            });





        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })

    const replaceWords = (sentence:string, appInputs:{
        [key: string]: string;
    }) => {
        const wordList = Object.keys(appInputs);
        const Values = Object.values(appInputs);
        let replacedSentence = sentence;
    
        for (const word of wordList) {
            const regex = new RegExp(`@${word}\\b`, 'g');
            replacedSentence = replacedSentence.replace(regex, `<<<USER_INPUT_VALUE>>>${word}<<</USER_INPUT_VALUE>>>`);
        }
    
        return replacedSentence + '\n' + Object.keys(appInputs).map((key) => `${key}=${appInputs[key]}`).join("\n");
    };
    const reverseReplaceWords = (sentence: string): string => {
        const regexPattern = '<<<USER_INPUT_VALUE>>>(.*?)<<</USER_INPUT_VALUE>>>';
        const regex = new RegExp(regexPattern, 'g');
        const reversedSentence = sentence.replace(regex, (_: string, word: string) => `@${word}`);
        return reversedSentence;
    };
    
async function OpenAI(configuration: any, appInputs: any) {
    const { prompt, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, model } = configuration;

    // convert appInputs to key - value pair in string 
    const _appInputs = Object.keys(appInputs).map((key) => `${key}=${appInputs[key]}`).join("\n");
    // console.log(_appInputs);


    const calculatedPrompt = prompt.concat("\n" + _appInputs);
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