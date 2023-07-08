import { Configuration, OpenAIApi } from "openai";
// import type { TextCompletionResponse } from "types/openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function InterviewQuestionsGenerator(data: any) {

    const { numQuestions, roleType, difficultyLevel, companyName } = data;


    return new Promise(async (resolve, reject) => {

        const prompt = `As an interviewer for ${companyName ?? `[Company Name]`}, you are conducting an interview for the role of ${roleType}. Please generate ${parseInt(numQuestions)} interview questions based on the following criteria:\n\nDifficulty/Seniority Level: ${difficultyLevel}\n\n`;

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                "temperature": 0.5,
                "max_tokens": 200,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            });
            const response = completion.data;

            console.log(response);
            if (response.choices[0].finish_reason === "length")
                return reject("Length of the prompt is too long. Please reduce the number of questions or the length of the prompt.");

            const questions = splitString(response.choices[0].text);
            console.log(questions);

            const output : any[] = [{
                type: "ordered_list",
                data: questions
            }];
            return resolve(output);


        } catch (error) {
            console.error('Error generating interview questions:', error);
            return reject(error);
        }

    })



}
function splitString(string: string | undefined) {
    if (string === undefined)
        return [];
    const pattern = /\n\d+\./;
    const splitted = string.split(pattern);
    const filtered = splitted.filter((s) => s.trim() !== "").map((s) => s.trim());
    return filtered;
}
