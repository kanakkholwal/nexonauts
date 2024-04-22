"use server"
import axios from "axios";
import HTMLParser from "node-html-parser";
import { rawProduct } from "src/models/product";
import TurndownService from 'turndown';
import * as z from "zod";


const urlSchema = z.string().url();

export async function importProductFromURL(url: string) {
    if (!urlSchema.safeParse(url).success) {
        return Promise.reject(new Error("Invalid URL"));
    }
    try {
        const response = await axios.get(url);
        const html = response.data;
        const root = HTMLParser.parse(html);
        const turndownService = new TurndownService()

        const product: rawProduct = {
            name: root.querySelector("header>h1")?.innerText || "",
            description: turndownService.turndown(root.querySelector(".rich-text")?.innerHTML || ""),
            published: false,
            url,
            slug: url,
            preview_url: root.querySelector("meta[property='og:image']")?.getAttribute("content") || "",
            tags: [],
            categories: [],
            price: parseFloat(root.querySelector(".price")?.getAttribute("content") || "0"),
            third_party: null,
        };
        console.log(product);

        return Promise.resolve(product);
    } catch (e) {
        return Promise.reject(e);
    }

}