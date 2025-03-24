import Configuration from 'openai'

import Replicate from 'replicate'

import { auth } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function POST(request: Request) {
    try {

        const { userId } = await auth();

        const { prompt } = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }



        if (!prompt) {
            return new NextResponse("Prompt is required ", { status: 400 })
        }

        const input = {
            fps: 24,
            width: 1024,
            height: 576,
            prompt: prompt,
            guidance_scale: 17.5
        };

        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });

        return NextResponse.json(response);

    } catch (error) {
        console.log("Error occured while [VIDEO] ", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}