import React from 'react';
import { getAllPosts_URL } from "../../src/blog/getAPIs"

export default function BlogHomePage() {

    console.log(getAllPosts_URL(5));

    return (
        <>
            home page
        </>
    )
}