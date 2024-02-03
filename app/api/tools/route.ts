import dbConnect from "lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PublicTool from 'src/models/tool';
import { Worker } from 'worker_threads';

export async function PUT(request: NextRequest) {
    try {
        
        await dbConnect();
        const time = new Date().getTime()

        const alTools = await PublicTool.find({}).select('name link').lean().exec();

        for await(const tool of alTools){
            //  Create a new worker thread for each tool
            const worker = new Worker('./worker.ts', { workerData: { tool } });
            // Listen for messages from worker threads.
            worker.on('message', (message) => {
                console.log(message);
            });
            // Listen for errors from worker threads.
            worker.on('error', (error) => {
                console.error(error);
            });
            // Listen for exit events from worker threads.
            worker.on('exit', () => {
                console.log(`Worker ${tool.name} stopped working.`);
            });
            

        }


        const newTime = new Date().getTime()

        return NextResponse.json({
            result: "success",
            message: `Time taken : ${(newTime-time)/100}seconds`,
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
