import { GoogleGenAI } from "@google/genai";

// The API key is assumed to be set in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAvatar = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        const image = response.generatedImages?.[0]?.image?.imageBytes;

        if (image) {
            return image;
        } else {
            throw new Error("No image was generated. The response may be empty or the prompt might have been blocked due to safety settings.");
        }

    } catch (error) {
        console.error("Error generating avatar:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate avatar: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the avatar.");
    }
};
