import {ApiPath,ApiKey} from "./ApiMeta";

export const ApiUrl = ApiPath + "?key=" + ApiKey;

// Get Requests 

    // For Posts
export const getAllPosts_URL = (NoOfPosts: number):string  => ApiPath + "/posts?maxResults=" + NoOfPosts.toString() + "&key=" + ApiKey
export const getSpecificPostById_URL = (PostID: string):string  => ApiPath + "/posts/" + PostID + "&key=" + ApiKey
export const getPostsSearchByQuery_URL = (Query: string):string  => ApiPath + "/posts/search/?q=" + Query + "&key=" + ApiKey
export const getPostByPath_URL = (path: string):string => ApiPath + "/posts/bypath?path=" + encodeURIComponent(path + ".html") + "&key=" + ApiKey
    // For Comment
export const getAllPostCommentsByPostId_URL = (NoOfComments: number) => ApiPath + "/posts/comments?maxResults=" + NoOfComments.toString() + "&status=LIVE&view=READER&key=" + ApiKey


