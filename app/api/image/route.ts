import Configuration from 'openai'

import OpenAI from 'openai'

import { auth } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAI()

export async function POST(request: Request) {
    try {

        const { userId } = await auth();

        const { prompt, amount = 1, resolution = "1024x1024" } = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("Open API Key is not configured", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("Prompt are required ", { status: 400 })
        }

        if (!amount) {
            return new NextResponse("Amount are required ", { status: 400 })
        }

        if (!resolution) {
            return new NextResponse("Resolution are required ", { status: 400 })
        }

        const response = await openai.images.generate({

            model: "dall-e-3",
            prompt: prompt,
            n: parseInt(amount),
            size: "1024x1024",
            // prompt,
            // n: parseInt(amount, 10),
            // size: resolution,
        })



        // console.log("IMAGE GENEREATION RESPONSE :", response.data)
        return NextResponse.json(response.data);

    } catch (error) {
        console.log("Error occured while [IMAGE GENERATION] ", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}