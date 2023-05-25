import axios from "axios";

export const registerView = async ({ title, slug, type }) => {
    await axios.post("/api/pages", {
        slug: slug,
        type: type,
        title: title,
        increase: ["view"]
    }).then(({ data }) => {
        console.log(data.message);
    }).catch((error) => {
        console.log(error);
    })
}
export const registerShare = async ({ title, slug, type }) => {
    await axios.post("/api/pages", {
        slug: slug,
        type: type,
        title: title,
        increase: ["share"]
    }).then(({ data }) => {
        console.log(data.message);
    }).catch((error) => {
        console.log(error);
    })
}