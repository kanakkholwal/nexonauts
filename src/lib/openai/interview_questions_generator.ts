import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge"
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);


export default async function InterviewQuestionsGenerator(data: any) {

    const { numQuestions, roleType, difficultyLevel ,companyName} = data;


    return new Promise(async (resolve, reject) => {
        
        const prompt = `As an interviewer for ${companyName ?? `[Company Name]`}, you are conducting an interview for the role of ${roleType}. Please generate ${parseInt(numQuestions)} interview questions based on the following criteria:\n\nDifficulty/Seniority Level: ${difficultyLevel}\n\n`;

        try {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 100,
                n: numQuestions,
                stop: '\n',
                temperature: 0.7,
            });
            const output = (await response.json()) as ResponseTypes["createCompletion"];
            const questions = output.choices.map((choice) => choice.text);
            resolve(questions);


        } catch (error) {
            console.error('Error generating interview questions:', error);
            reject(error);
        }

    })



}