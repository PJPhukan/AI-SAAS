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

        const { messages } = await request.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!configuration.apiKey) {
            return new NextResponse("Open API Key is not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Message are required ", { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages
        });


        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("Error occured while [CONVERSATION] ", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}