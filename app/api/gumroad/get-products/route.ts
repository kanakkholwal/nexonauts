
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        
        const GUMROAD_ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN as string;
        // const 

      
        return NextResponse.json({
            result: "success",
        },{
            status:200
        })
        
    }
    catch (error) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}
