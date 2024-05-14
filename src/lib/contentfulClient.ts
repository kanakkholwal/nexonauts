
import { createClient } from 'contentful';

export const client = createClient({
    space: process.env.CTFL_SPACE_ID as string,
    environment: "master",
    host:'cdn.contentful.com',
    accessToken: process.env.CTFL_TOKEN as string
});