import axios from "axios";
import crypto from "crypto";

const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
export function generateUploadSignature(publicId: string, apiSecret: string) {
    const signature = generateSignature(publicId, apiSecret);
    return generateSHA1(signature);

}
export function getPublicIdFromUrl(url: string) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export async function deleteImage(publicId: string) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
    const timestamp = new Date().getTime();
    const apiKey = process.env.CLOUDINARY_API_KEY as string;
    const apiSecret = process.env.CLOUDINARY_API_SECRET as string;
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
        const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key: apiKey,
            timestamp: timestamp,
        });
        console.error(response);
        return Promise.resolve(response.data);

    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
export async function uploadImagefromClient(file: File): Promise<string>{
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
    formData.append("folder", process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER as string);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    try {
        const response = await axios.post(url, formData);
        return Promise.resolve(response.data.secure_url);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }

}
