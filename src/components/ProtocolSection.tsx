import { ArrowRight, Leaf, Beef, Croissant } from 'lucide-react';

export default function ProtocolSection() {
  const steps = [
    {
      title: 'Fiber First',
      description: 'Start with greens or veggies to create a fiber mesh in your stomach, slowing sugar absorption.',
      icon: <Leaf className="w-6 h-6 text-sage" />,
      color: 'bg-sage/10',
      label: 'Stage 1'
    },
    {
      title: 'Protein & Fats',
      description: 'Follow with high-quality proteins and healthy fats to trigger satiety hormones like GLP-1.',
      icon: <Beef className="w-6 h-6 text-gold" />,
      color: 'bg-gold/10',
      label: 'Stage 2'
    },
    {
      title: 'Starch Last',
      description: 'Enjoy your complex carbs last to blunt the glucose spike and prevent the crash.',
      icon: <Croissant className="w-6 h-6 text-red-soft" />,
      color: 'bg-red-soft/10',
      label: 'Stage 3'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0">
      <div className="text-center mb-12">
        <h4 className="text-sm font-mono text-gold uppercase tracking-widest mb-4 font-bold">The Science of Natural GLP-1</h4>
        <h2 className="text-3xl md:text-5xl font-bold text-forest mb-6">Eat-in-Order Protocol</h2>
        <p className="text-mid max-w-2xl mx-auto text-lg leading-relaxed">
          The sequence of your food matters as much as the food itself. By following this order, you can blunt glucose spikes by up to 75% and naturally stimulate your body's GLP-1 production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
        
        {steps.map((step, i) => (
          <div key={i} className="relative z-10 bg-white p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center text-center">
            <div className={`w-12 h-12 md:w-16 md:h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
              {step.icon}
            </div>
            <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest mb-2">
              {step.label}
            </span>
            <h3 className="text-xl font-bold text-forest mb-3">{step.title}</h3>
            <p className="text-sm text-mid leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-forest text-cream p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-4">Why it works</h3>
          <p className="text-cream/80 text-sm md:text-base leading-relaxed mb-6">
            When you eat fiber first, it forms a viscous layer in the small intestine. This physical barrier slows down the breakdown of subsequent carbohydrates, preventing the "glucose roller coaster" that drives hunger and insulin resistance. This steady environment is exactly what your L-cells need to secrete GLP-1 naturally.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-bold">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              Blunts Glucose
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              Triggers Satiety
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full" />
              Reduces Cravings
            </span>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-sage/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
