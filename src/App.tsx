import { useRef, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { UploadZone } from './components/UploadZone';
import { ResultsCard } from './components/ResultsCard';
import { FeaturesSection } from './components/FeaturesSection';
import { classifyImage } from './services/api';
import { ClassificationResult, UploadState } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const uploadRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' });

  const scrollToUpload = () => {
    const el = uploadRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetTop = rect.top + window.scrollY - 24;

    const smoothScrollTo = (to: number, duration = 500) => {
      const start = window.scrollY || window.pageYOffset;
      const change = to - start;
      const startTime = performance.now();

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, Math.round(start + change * eased));
        if (elapsed < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    smoothScrollTo(targetTop, 520);
  };

  const handleFileSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setUploadState({
        status: 'error',
        error: 'File size must be less than 10MB',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setPreview(imageData);
      setResult(null);

      setUploadState({ status: 'loading' });

      try {
        const classificationResult = await classifyImage(file);
        setResult(classificationResult);
        setUploadState({ status: 'success' });
      } catch (error) {
        setUploadState({
          status: 'error',
          error:
            error instanceof Error
              ? error.message
              : 'Failed to classify image. Please try again.',
        });
        setPreview(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPreview(null);
    setResult(null);
    setUploadState({ status: 'idle' });
  };

  return (
    <div className="w-full">
      <HeroSection onScrollToUpload={scrollToUpload} />

      <section
        ref={uploadRef}
        className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-slate-100 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-slate-900">
              Upload Your Image
            </h2>
            <p className="text-slate-600">
              Drop an image or click to browse. Our AI will analyze and classify it instantly.
            </p>
          </div>

          <div className="space-y-6">
            {result && uploadState.status === 'success' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <UploadZone
                    onFileSelect={handleFileSelect}
                    isLoading={uploadState.status === 'loading'}
                    preview={preview}
                    onClear={handleClear}
                  />
                </div>

                <div className="animate-fadeIn">
                  <ResultsCard result={result} />
                </div>
              </div>
            ) : (
              <UploadZone
                onFileSelect={handleFileSelect}
                isLoading={uploadState.status === 'loading'}
                preview={preview}
                onClear={handleClear}
              />
            )}

            {uploadState.status === 'error' && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-700">{uploadState.error}</p>
                </div>
              </div>
            )}

            {result && (
              <button
                onClick={handleClear}
                className="w-full py-3 rounded-lg border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-600 font-semibold transition-colors duration-200"
              >
                Classify Another Image
              </button>
            )}
          </div>
        </div>
      </section>

      <FeaturesSection />

      <footer className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">
          <p>
            Powered by ResNet-50 Deep Learning • Built for a better, cleaner future
          </p>
          <p className="mt-2 text-sm">
            © 2025 - NATHANAEL BILLY CHRISTIANO - FILIPUS DARREN SISWANTO - SERGIO WINNERO - HANS CHRISTIAN SOEBROTO.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
