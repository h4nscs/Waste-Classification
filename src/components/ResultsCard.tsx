import { ClassificationResult, CLASS_COLORS, CLASS_ICONS } from '../types';
import { TrendingUp, CheckCircle } from 'lucide-react';

interface ResultsCardProps {
  result: ClassificationResult;
}

export function ResultsCard({ result }: ResultsCardProps) {
  const icon = CLASS_ICONS[result.predicted_class] || '🔍';
  const gradientClass = CLASS_COLORS[result.predicted_class] || 'from-blue-400 to-blue-600';

  const topClasses = Object.entries(result.all_classes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-100">
        <div className={`bg-gradient-to-br ${gradientClass} p-8 sm:p-12 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center justify-center">
              <span className="text-6xl sm:text-7xl">{icon}</span>
            </div>

            <h2 className="mb-2 text-4xl sm:text-5xl font-bold capitalize">
              {result.predicted_class}
            </h2>

            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5" />
              <span className="text-lg">Classification Complete</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                Confidence Score
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                {result.confidence}%
              </span>
            </div>

            <div className="w-full bg-gradient-to-r from-slate-200 to-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradientClass} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>

            {result.confidence >= 85 && (
              <p className="mt-2 text-sm text-slate-600">
                ✓ High confidence prediction
              </p>
            )}
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">All Classifications</h3>
            </div>

            <div className="space-y-3">
              {topClasses.map(([className, confidence]) => (
                <div key={className} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {className}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 group-hover:to-blue-700"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Classification</p>
          <p className="text-2xl font-bold text-slate-900 capitalize">{result.predicted_class}</p>
        </div>
        <div className="rounded-xl bg-white p-4 border border-slate-100 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-blue-600">{result.confidence}%</p>
        </div>
      </div>
    </div>
  );
}
