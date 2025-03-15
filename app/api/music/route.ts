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

        
        const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", {
            input: {
                prompt_b: prompt
            }
        });
        console.log(response) //TODO: Remove after the checking


        return NextResponse.json(response);

    } catch (error) {
        console.log("Error occured while [MUSIC] ", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}