import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        const time = new Date().getTime();
        const secretKeyLength = parseInt(request.nextUrl.searchParams.get('length') || "32");
        if (secretKeyLength > 512)
            throw new Error("Secret key length should be less than 512");

        const encoding = request.nextUrl.searchParams.get('encoding') || "hex";
        if (encoding !== "hex" && encoding !== "base64")
            throw new Error("Encoding should be either hex or base64");

        const token = crypto.randomBytes(secretKeyLength).toString(encoding);


        const newTime = new Date().getTime()

        return NextResponse.json({
            result: "success",
            message: `Time taken : ${(newTime - time) / 100}seconds`,
            data: {
                token
            }
        }, {
            status: 200
        })

    }
    catch (error) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        }, {
            status: 500
        })
    }


}
