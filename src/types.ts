export interface ClassificationResult {
  predicted_class: string;
  confidence: number;
  all_classes: Record<string, number>;
}

export interface UploadState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

export const CLASS_COLORS: Record<string, string> = {
  metal: 'from-gray-400 to-gray-600',
  glass: 'from-blue-300 to-blue-500',
  biological: 'from-green-400 to-green-600',
  paper: 'from-amber-300 to-amber-500',
  battery: 'from-red-400 to-red-600',
  trash: 'from-slate-400 to-slate-600',
  cardboard: 'from-orange-300 to-orange-500',
  shoes: 'from-indigo-400 to-indigo-600',
  clothes: 'from-pink-400 to-pink-600',
  plastic: 'from-purple-400 to-purple-600',
};

export const CLASS_ICONS: Record<string, string> = {
  metal: '⚙️',
  glass: '🔷',
  biological: '🌱',
  paper: '📄',
  battery: '🔋',
  trash: '🗑️',
  cardboard: '📦',
  shoes: '👟',
  clothes: '👕',
  plastic: '🧪',
};
