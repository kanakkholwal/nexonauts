

export const getImages = (toolLink: string) => {
    try {
        if (!toolLink) {
            return {
                bannerURL: null,
                iconURL: null,
            };
        }
        const bannerURL = new URL(`https://api.microlink.io/`);
        bannerURL.searchParams.append("url", toolLink);
        bannerURL.searchParams.append("screenshot", "true");
        bannerURL.searchParams.append("meta", "false");
        bannerURL.searchParams.append("embed", "screenshot.url");
        const iconURL = new URL(`https://www.google.com/s2/favicons`);
        iconURL.searchParams.append("domain", new URL(toolLink).hostname);
        iconURL.searchParams.append("sz", "1024");
        return {
            bannerURL: bannerURL.toString(),
            iconURL: iconURL.toString(),
        };
    } catch (error) {
        console.error("Error fetching images:", error);
    }
    return {
        bannerURL: null,
        iconURL: null,
    };
}


export function marketwiseLink(link: string, path: string = "/scout") {
    const url = new URL(link);
    url.searchParams.append("ref", "nexonauts.com" + path);
    url.searchParams.append("utm_source", "nexonauts.com");
    url.searchParams.append("utm_medium", "referral");
    url.searchParams.append("utm_campaign", "nexonauts.com" + path);
    return url.toString();
}

