import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dbConnect from 'lib/dbConnect';
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import User from 'models/user';
import nextConnect from 'next-connect';
import App, { AppUsage } from 'models/app';

import type { NextApiRequest, NextApiResponse } from 'next';

export default nextConnect(handler)
  .use(hasTokenMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
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

      const calculatedPrompt =
        replaceWords(
          config.prompt,
          Object.keys(appInputs).map((key) => key)
        ) +
        '\n' +
        Object.keys(appInputs)
          .map((key) => `${key}=${appInputs[key]}`)
          .join('\n');
      console.log('calculatedPrompt', calculatedPrompt);
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string
      );
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const result = await model.generateContent(calculatedPrompt);
      const text = await result.response.text();
      console.log(text);
      // save app usage
      const appUsage = new AppUsage({
        userId: existingUser._id,
        appId: appId,
        createdAt: new Date(),
        type: 'playground_usage',
        usage: {
          ...appInputs,
        },
        model_used: 'gemini-pro',
      });

      await appUsage.save();

      return res.status(200).json({
        result: {
          data: text,
          type: 'plaintext',
        },
        message: 'Output generated successfully in playground mode!',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message ?? 'Internal Server Error',
      });
    }
  });

const replaceWords = (sentence, wordList) => {
  let replacedSentence = sentence;

  for (const word of wordList) {
    const regex = new RegExp(`@${word}\\b`, 'g');
    replacedSentence = replacedSentence.replaceAll(
      regex,
      `<<<USER_INPUT_VALUE>>>${word}<<</USER_INPUT_VALUE>>>`
    );
  }

  return replacedSentence;
};
const reverseReplaceWords = (sentence: string): string => {
  const regexPattern = '<<<USER_INPUT_VALUE>>>(.*?)<<</USER_INPUT_VALUE>>>';
  const regex = new RegExp(regexPattern, 'g');
  const reversedSentence = sentence.replace(
    regex,
    (_: string, word: string) => `@${word}`
  );
  return reversedSentence;
};
