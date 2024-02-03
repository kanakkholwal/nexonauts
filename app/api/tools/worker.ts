import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import PublicTool from 'src/models/tool';
import { isMainThread, workerData } from 'worker_threads';

// Function to update a single public tool description
async function updatePublicToolDescription(toolId: string, newDescription: string) {
    try {
        const updatedTool = await PublicTool.findByIdAndUpdate(
            toolId,
            { $set: { description: newDescription } },
            { new: true }
        );
        console.log(`Updated tool with ID ${toolId}`);
        // You can do additional logging or error handling here
    } catch (error) {
        console.error(`Error updating tool with ID ${toolId}: ${error.message}`);
    }
}

// Function to generate a new description using Google Generative AI
async function generateDescription(model:GenerativeModel,toolName:string,toolSite:string) {
    // ... (Your existing code for Google Generative AI)
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };
    const parts = [
        { text: `Write an description and an overview of ${toolName} which has website this : ${toolSite} telling about it and it's pricing model and every basic thing I should know before using it.` },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
    });
    return result.response.text();
}

// Worker thread logic
if (!isMainThread) {
    const { tool } = workerData;
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const Action =async () => {
        const newDescription = await generateDescription(model,tool.name,tool.link);
        await updatePublicToolDescription(tool._id, newDescription);
        
    }
    Action()
}
