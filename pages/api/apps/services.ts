import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from 'lib/dbConnect';
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import App, { AppUsage } from 'models/app';
import User from 'models/user';
import nextConnect from 'next-connect';
import rateLimit from 'src/utils/rate-limiter';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export default nextConnect(handler)
  .use(hasTokenMiddleware)
  .post(async (req, res) => {
    try {
      await limiter.check(res, 10, 'CACHE_TOKEN'); // 10 requests per minute

      await dbConnect();
      const { userId, appId, appData } = req.body;
      if (!appData || !appId || !userId) {
        return res.status(401).json({ message: 'All fields are required!!' });
      }
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found!' });
      }

      // check if app exists
      const _app = await App.findOne({
        appId: appId,
      }).select('config status');

      if (!_app) {
        return res.status(404).json({ message: 'App not found!' });
      }

      // check if app state is published
      if (_app.status !== 'published') {
        return res.status(404).json({ message: 'App is not published!' });
      }

      const calculatedPrompt =
        replaceWords(
          _app?.config?.prompt as string,
          Object.keys(appData).map((key) => key)
        ) +
        '\n' +
        Object.keys(appData)
          .map((key) => `${key}=${appData[key]}`)
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
        type: existingUser.account_type + '_usage',

        usage: {
          ...appData,
        },
        model_used: 'gemini-pro',
      });
      await appUsage.save();

      return res.status(200).json({
        result: {
          data: text,
          type: 'plaintext',
        },
        message: 'Output generated successfully',
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
