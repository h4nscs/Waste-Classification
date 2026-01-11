import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToUpload: () => void;
}

export function HeroSection({ onScrollToUpload }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-slate-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-slate-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur border border-blue-200/50 text-sm font-medium text-slate-700">
            <Sparkles className="w-4 h-4 text-blue-500" />
            AI-Powered Waste Classification
          </span>
        </div>

        <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Classify Your Trash
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
            Intelligently
          </span>
        </h1>

        <p className="mb-8 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
          Powered by advanced AI, instantly identify and classify any trash item into one of 10 categories. Support better recycling habits with confidence.
        </p>

        <button
          onClick={onScrollToUpload}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
        >
          Start Classifying
          <ArrowDown className="w-5 h-5" />
        </button>

        <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12 text-sm text-slate-600">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">10</span>
            <span>Waste Classes</span>
          </div>
          <div className="hidden sm:flex w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">99%+</span>
            <span>Accuracy</span>
          </div>
          <div className="hidden sm:flex w-px h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-blue-600">Real-time</span>
            <span>Processing</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-blue-400/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-blue-400/50 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
