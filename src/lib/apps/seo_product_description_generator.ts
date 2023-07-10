
export default async function InterviewQuestionsGenerator(data: any,openai) {

    const { productDetails } = data;


    return new Promise(async (resolve, reject) => {

        const prompt = `I want you to act as a very proficient SEO and high-end eCommerce copy writer that speaks and writes fluently English. Write a 300 word product description in English based on the product details I give you. Also follow these guidelines:
        - Focus on benefits rather than features
        - Avoid sentences over 20 words
        - Avoid using passive voice
        - Include a call to action at the end 
        
        Here are the product details:${productDetails}`;

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                "temperature": 0.5,
                "max_tokens": 1000,
                "top_p": 1.0,
                "frequency_penalty": 0.0,
                "presence_penalty": 0.0
            });
            const response = completion.data;

            console.log(response);
            if (response.choices[0].finish_reason === "length")
                return reject("Length of the prompt is too long. Please reduce the number of questions or the length of the prompt.");

          

            const output: Output[] = [{
                outputType: "plaintext",
                data: "Here is the product description:\n\n"
            }, {
                outputType: "plaintext",
                data: response.choices[0].text
            }];
            return resolve(output);


        } catch (error) {
            console.error('Error generating interview questions:', error);
            return reject(error);
        }

    })



}

type Output = {
    outputType: string,
    data: any,
    subtype?: string,
}