import { authOptions } from 'app/api/auth/[...nextauth]/options';

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, link } = await request.json();

    const session = await getServerSession({ req: request, ...authOptions });
    if (!session) {
      return NextResponse.json(
        {
          result: 'fail',
          message: 'Unauthorized',
        },
        {
          status: 401,
        }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const newDescription = await generateDescription(model, name, link);

    return NextResponse.json(
      {
        result: 'success',
        message: 'Description generated successfully',
        data: newDescription,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: 'fail',
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// Function to generate a new description using Google Generative AI
async function generateDescription(
  model: GenerativeModel,
  toolName: string,
  toolSite: string
) {
  // ... (Your existing code for Google Generative AI)
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };
  const prompt = `
Write a description and an overview of ${toolName}, which has a website at ${toolSite}, providing details about the tool, its pricing model, and any other basic information I should know before using it. Please ensure the generated summary is comprehensive and includes relevant details. 
`;
  const parts = [{ text: prompt }];

  const result = await model.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig,
  });
  return result.response.text();
}
