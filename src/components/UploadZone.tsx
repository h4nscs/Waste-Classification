import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  preview: string | null;
  onClear: () => void;
}

export function UploadZone({ onFileSelect, isLoading, preview, onClear }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  if (preview && !isLoading) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-auto max-h-96 object-cover"
        />
        <button
          onClick={onClear}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all"
          aria-label="Clear image"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
        isDragActive
          ? 'border-blue-500 bg-blue-50/50 scale-105'
          : 'border-slate-300 bg-gradient-to-br from-white to-slate-50 hover:border-blue-400'
      }`}
    >
      <div className="p-8 sm:p-12 text-center">
        <div className="mb-4 flex justify-center">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragActive
              ? 'bg-blue-100'
              : 'bg-gradient-to-br from-slate-100 to-slate-50 group-hover:from-blue-100 group-hover:to-slate-100'
          }`}>
            {isLoading ? (
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin"></div>
            ) : (
              <Upload className={`w-12 h-12 transition-all ${
                isDragActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'
              }`} />
            )}
          </div>
        </div>

        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-slate-900">
          {isLoading ? 'Processing Image...' : 'Drop your image here'}
        </h3>

        <p className="mb-6 text-sm sm:text-base text-slate-600">
          or{' '}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="font-semibold text-blue-600 hover:text-blue-700 underline transition-colors disabled:opacity-50"
          >
            browse your computer
          </button>
        </p>

        <p className="text-xs sm:text-sm text-slate-500">
          Supported formats: JPG, PNG, WebP (Max 10MB)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          disabled={isLoading}
          className="hidden"
          aria-label="Upload image"
        />

        {isLoading && (
          <div className="mt-4 text-sm text-slate-600">
            <div className="inline-block">Analyzing your image...</div>
          </div>
        )}
      </div>
    </div>
  );
}
