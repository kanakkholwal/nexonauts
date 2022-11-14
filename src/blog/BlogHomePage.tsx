import React from 'react';

const BlogId = "4179656111745839953";
const ApiPath = "https://www.googleapis.com/blogger/v3/blogs/" + BlogId;
const ApiKey = "AIzaSyBUDOB3YQXY0GAmfdRB7zA6hnsnVvDQ36M";

const ApiUrl = ApiPath + "?key=" + ApiKey;

// Get Requests 


const getAllPostsURL = (NoOfPosts: number) => ApiPath + "/posts?maxResults=" + NoOfPosts.toString() + "&key=" + ApiKey
const getSpecificPostByIdURL = (PostID: string) => ApiPath + "/posts/" + PostID + "&key=" + ApiKey
const getPostsSearchByQuery = (Query: string) => ApiPath + "/posts/search/?q=" + Query + "&key=" + ApiKey
const getPostByPath = (path: string) => ApiPath + "/posts/bypath?path=" + encodeURIComponent(path + ".html") + "&key=" + ApiKey

const getAllPostCommentsByPostId = (NoOfComments: number) => ApiPath + "/posts/comments?maxResults=" + NoOfComments.toString() + "&status=LIVE&view=READER&key=" + ApiKey




export default function BlogHomePage(): JSX.Element {




    return (
        <>
            Blog Home
        </>
    )
}