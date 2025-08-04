
import React from 'react';
import { SpinnerIcon, ShareIcon, ImageIcon } from './IconComponents';

interface AvatarDisplayProps {
    imageUrl: string | null;
    isLoading: boolean;
    onShare: () => void;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ imageUrl, isLoading, onShare }) => {
    return (
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex flex-col justify-center items-center aspect-square">
            {isLoading && (
                <div className="flex flex-col items-center gap-4 text-slate-400">
                    <SpinnerIcon className="w-16 h-16" />
                    <p className="text-lg">Creating your masterpiece...</p>
                </div>
            )}
            {!isLoading && !imageUrl && (
                <div className="text-center text-slate-500">
                    <ImageIcon className="w-24 h-24" />
                    <p className="mt-4 text-lg">Your generated avatar will appear here</p>
                </div>
            )}
            {!isLoading && imageUrl && (
                <div className="w-full h-full flex flex-col items-center justify-center relative group">
                    <img
                        src={imageUrl}
                        alt="Generated Avatar"
                        className="rounded-lg object-contain w-full h-full max-w-full max-h-full"
                    />
                    <button
                        onClick={onShare}
                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 hover:bg-black/75 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95"
                    >
                        <ShareIcon />
                        Share
                    </button>
                </div>
            )}
        </div>
    );
};