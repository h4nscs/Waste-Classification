import { Zap, Cpu, Leaf, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-time Classification',
    description: 'Get instant results in milliseconds. Powered by state-of-the-art deep learning.',
  },
  {
    icon: Cpu,
    title: '10 Waste Categories',
    description: 'Identifies metal, glass, plastic, paper, cardboard, shoes, clothes, battery, biological, and trash.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Impact',
    description: 'Support better recycling habits and reduce environmental waste with confident classification.',
  },
  {
    icon: Shield,
    title: 'Accurate & Reliable',
    description: 'ResNet-50 neural network delivers 99%+ accuracy for precise waste identification.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl -ml-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl -mr-48"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="mb-4 text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Why Choose Our Classifier
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Built with cutting-edge AI technology to deliver accurate, fast, and reliable waste classification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl bg-white p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              >
                <div className="mb-6 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-slate-100 group-hover:from-blue-200 group-hover:to-blue-100 transition-all">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-slate-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
