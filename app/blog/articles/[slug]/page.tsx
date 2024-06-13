// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import { getPostBySlug, getRecentPosts } from 'src/lib/blog/actions';
import { CommentsSection, PostHeader, RenderPost, SideBar } from "./components";

export const revalidate = 60;

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     slug: string;
//   };
// }) {

//   const { post, success } = await getPostBySlug(params.slug);
//   if (!post || success === false) {
//     console.log('Post not found, Slug :', params.slug);
//     return notFound();
//   }
//   const metadata: Metadata = {
//     title: post.title,
//     description: post.description,
//   };
//   return metadata;
// }
const post = {
  _id: "64e336cc3365a8391a6a404f",
  title: "How to Deploy Your Node.js Backend on Vercel: A Step-by-Step Guide",
  content:
    'Deploying your Node.js backend on Vercel is a streamlined process that can bring your application to life on the web. In this revised guide, we\'ll walk you through the updated steps to ensure your backend is deployed using the most current methods. Let\'s get started.\n\n## 1. Create **Your Vercel Account**\n\nTo begin, sign up for a Vercel account at [vercel.com](https://vercel.com/) . You can choose your preferred authentication method, whether it\'s GitHub, GitLab, or Bitbucket.\n\n## 2. **Create a Simple Express API**\n\nEnsure you have Node.js and NPM installed on your local machine. If not, you can download them from <https://nodejs.org/>.\n\nStart by creating a new directory for your project, navigating to it, and initializing a new Node.js project:\n\n```js\nmkdir my-express-api\ncd my-express-api\nnpm init -y\n\n```\n\nInstall Express and create an `index.js` file :\n\n```sql\nnpm install express\ntouch index.js\n```\n\nOpen `index.js` in your preferred code editor and add the following code to create a basic Express API:\n\n```js\nconst express = require("express");\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("Express on Vercel");\n});\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => {\n  console.log(`Server is running on port ${PORT}`);\n});\n```\n\n## 3. **Export the Express API**\n\nModify your `index.js` file to export the Express app at the end of the file:\n\n```js\n// ... (previous code)\n\nmodule.exports = app; // Export the Express app\n```\n\n## 4. **Add** `vercel.json` **Configuration**\n\nCreate a `vercel.json` file in your project directory:\n\n````sql\ntouch vercel.json\n```Inside `` `vercel.json `` , specify the build settings and routes as follows:\n\n```js\n\n{\n  "version": 2,\n  "builds": [\n    {\n      "src": "index.js",\n      "use": "@now/node"\n    }\n  ],\n  "routes": [\n    {\n      "src": "/(.*)",\n      "dest": "index.js"\n    }\n  ]\n}\n````\n\n## 5. **Deploy Your Express API**\n\nInitialize a Git repository, commit your code, and push it to your source repository, whether it\'s on GitHub, GitLab, or another platform.\n\n* Vercel will automatically detect your repository and build your Express API based on the `vercel.json` configuration.\n\nOnce the deployment is complete, you can access your API at the provided Vercel URL, such as `your-app-name.vercel.app`, to confirm that it\'s up and running.\n\nCongratulations! Your Node.js backend is now successfully deployed on Vercel as a serverless function. Be sure to adapt this guide to your specific project structure and requirements for a seamless deployment experience.![]()',
  slug: "how-to-deploy-your-node.js-backend-on-vercel-a-step-by-step-guide",
  labels: [
    "Node.js",
    "Express.js",
    "Vercel",
    "Serverless Functions",
    "Next.js",
    "Backend Deployment",
    "Web Development",
    "Application Architecture",
    "Scalability",
  ],
  metadata: {
    keywords: [],
    image:
      "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp",
  },
  image:
    "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  state: "published",
  author: {
    name: "Kanak Kholwal",
    username: "kanakkholwal",
    profilePicture: "https://github.com/kanakkholwal.png",
  },
  analytics: { $oid: "64e336cd3365a8391a6a4051" },
  claps: { $numberInt: "3" },
  comments: { enabled: true },
  createdAt: "2024-06-13T17:32:20.443Z",
  description:
    "Deploying your Node.js backend on Vercel using Serverless Functions offers a powerful solution for creating scalable and flexible applications. Learn how to make the most of Express.js ...",
};

export default async function PostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  // const { post, success } = await getPostBySlug(params.slug);
  // const recentPosts = await getRecentPosts(5);
  // if (!post || success === false) {
  //   console.log('Post not found, Slug :', params.slug);
  //   return notFound();
  // }

  return (
    <>
      <PostHeader
        title={post.title}
        image={post.image}
        author={post.author}
        createdAt={post.createdAt}
      />
      <main className="w-full mx-auto flex justify-around items-start gap-4 flex-col @4xl:flex-row px-4 lg:px-8 pt-8">
        <RenderPost content={post.content} />
        <SideBar
          author={post.author}
          createdAt={post.createdAt}
          content={post.content}
        />
      </main>
      <div>
        <CommentsSection />
      </div>
    </>
  );
}
