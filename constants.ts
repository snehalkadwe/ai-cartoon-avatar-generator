import type { Accessory, BackgroundColor } from './types';

export const ACCESSORIES: Accessory[] = ['glasses', 'a hat'];

export const BACKGROUND_COLORS: BackgroundColor[] = [
  { name: 'off-white', hex: '#f8fafc' }, // slate-50
  { name: 'light gray', hex: '#e2e8f0' }, // slate-200
  { name: 'sky blue', hex: '#e0f2fe' }, // sky-100
  { name: 'light cyan', hex: '#cffafe' }, // cyan-100
  { name: 'mint green', hex: '#dcfce7' }, // green-100
  { name: 'pale yellow', hex: '#fef08a' }, // yellow-200
  { name: 'peach', hex: '#fed7aa' }, // orange-200
  { name: 'pink', hex: '#fecaca' }, // red-200
];

export const AVATAR_STYLE_PROMPT: string = 'front-facing, head and shoulders portrait, highly stylized cartoon style with exaggerated features, vibrant colors, vector art, simple clean design, bold outlines, simple shapes';