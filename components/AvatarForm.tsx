import React from 'react';
import type { Accessory, BackgroundColor } from '../types';
import { SpinnerIcon } from './IconComponents';

interface AvatarFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    selectedAccessories: Set<Accessory>;
    onAccessoryToggle: (accessory: Accessory) => void;
    backgroundColor: BackgroundColor;
    setBackgroundColor: (color: BackgroundColor) => void;
    isLoading: boolean;
    onSubmit: () => void;
    accessories: Accessory[];
    backgroundColors: BackgroundColor[];
}

export const AvatarForm: React.FC<AvatarFormProps> = ({
    prompt,
    setPrompt,
    selectedAccessories,
    onAccessoryToggle,
    backgroundColor,
    setBackgroundColor,
    isLoading,
    onSubmit,
    accessories,
    backgroundColors
}) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col gap-6">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
                    1. Describe your avatar
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., a friendly robot with a glowing antenna"
                    className="w-full h-28 p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                    disabled={isLoading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    2. Add accessories
                </label>
                <div className="flex gap-3">
                    {accessories.map((acc) => (
                        <button
                            key={acc}
                            onClick={() => onAccessoryToggle(acc)}
                            disabled={isLoading}
                            className={`px-4 py-2 text-sm rounded-full capitalize transition-colors duration-200 border-2 ${
                                selectedAccessories.has(acc)
                                    ? 'bg-cyan-500 border-cyan-500 text-white'
                                    : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                            }`}
                        >
                            {acc}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    3. Choose a background color
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                    {backgroundColors.map((color) => (
                        <button
                            key={color.hex}
                            onClick={() => setBackgroundColor(color)}
                            disabled={isLoading}
                            className={`w-10 h-10 rounded-full transition-transform transform hover:scale-110 ${
                                backgroundColor.hex === color.hex ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white' : ''
                            }`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Select color ${color.name}`}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
                {isLoading ? (
                    <>
                        <SpinnerIcon />
                        Generating...
                    </>
                ) : (
                    'Generate Avatar'
                )}
            </button>
        </div>
    );
};