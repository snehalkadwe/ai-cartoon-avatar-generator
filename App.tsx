import React, { useState, useCallback } from 'react';
import type { Accessory, BackgroundColor } from './types';
import { ACCESSORIES, BACKGROUND_COLORS, AVATAR_STYLE_PROMPT } from './constants';
import { generateAvatar } from './services/geminiService';
import { AvatarForm } from './components/AvatarForm';
import { AvatarDisplay } from './components/AvatarDisplay';

export default function App(): React.ReactNode {
    const [prompt, setPrompt] = useState<string>('a young woman with long curly hair');
    const [selectedAccessories, setSelectedAccessories] = useState<Set<Accessory>>(new Set(['glasses']));
    const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>(BACKGROUND_COLORS[2]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAccessoryToggle = useCallback((accessory: Accessory) => {
        setSelectedAccessories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(accessory)) {
                newSet.delete(accessory);
            } else {
                newSet.add(accessory);
            }
            return newSet;
        });
    }, []);

    const handleGenerateClick = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a description for your avatar.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        // Enhance the prompt with avatar-specific styling instructions
        let finalPrompt = `A cartoon avatar of ${prompt.trim()}`;
        
        const accessories = Array.from(selectedAccessories);
        if (accessories.length > 0) {
            finalPrompt += `, wearing ${accessories.join(' and ')}`;
        }

        finalPrompt += `, ${AVATAR_STYLE_PROMPT}`;

        if (backgroundColor) {
            finalPrompt += `, with a solid ${backgroundColor.name} background`;
        }
        
        try {
            const imageB64 = await generateAvatar(finalPrompt);
            setImageUrl(`data:image/png;base64,${imageB64}`);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(errorMessage);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, selectedAccessories, backgroundColor]);

    const handleShareClick = useCallback(async () => {
        if (!imageUrl || !navigator.share) {
            alert('Sharing is not available on this device or browser.');
            return;
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'ai-avatar.png', { type: 'image/png' });

            await navigator.share({
                title: 'My AI Avatar',
                text: 'Check out this cartoon avatar I created!',
                files: [file],
            });
        } catch (err) {
            // Avoid showing an error if the user cancels the share dialog
            if (err instanceof Error && err.name !== 'AbortError') {
                setError('Could not share the image.');
                console.error('Share failed:', err);
            }
        }
    }, [imageUrl]);

    return (
        <main className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                        AI Cartoon Avatar Generator
                    </h1>
                    <p className="mt-2 text-lg text-slate-400">
                        Create your own unique avatar from a text description.
                    </p>
                </header>

                {error && (
                    <div className="mb-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <AvatarForm
                        prompt={prompt}
                        setPrompt={setPrompt}
                        selectedAccessories={selectedAccessories}
                        onAccessoryToggle={handleAccessoryToggle}
                        backgroundColor={backgroundColor}
                        setBackgroundColor={setBackgroundColor}
                        isLoading={isLoading}
                        onSubmit={handleGenerateClick}
                        accessories={ACCESSORIES}
                        backgroundColors={BACKGROUND_COLORS}
                    />
                    <AvatarDisplay
                        imageUrl={imageUrl}
                        isLoading={isLoading}
                        onShare={handleShareClick}
                    />
                </div>
            </div>
        </main>
    );
}