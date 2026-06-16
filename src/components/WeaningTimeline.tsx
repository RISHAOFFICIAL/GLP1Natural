import { Calendar, CheckCircle2, TrendingUp, Zap } from 'lucide-react';

export default function WeaningTimeline() {
  const phases = [
    {
      title: 'Foundation',
      time: 'Month 1',
      description: 'Before reducing medication, master the Eat-in-Order protocol. Focus on eliminating seed oils and HFCS to heal the gut lining.',
      icon: <Zap className="w-5 h-5 text-gold" />,
      tasks: ['Eliminate Seed Oils', 'Eat Fiber First', 'Track GLP-1 Score']
    },
    {
      title: 'Active Wean',
      time: 'Months 2-3',
      description: 'In coordination with your doctor, begin dosage reduction. Use the AI Meal Builder to compensate for lower synthetic GLP-1.',
      icon: <TrendingUp className="w-5 h-5 text-sage" />,
      tasks: ['Reduce Dosage', 'Prioritize Protein', 'Monitor Food Noise']
    },
    {
      title: 'Independence',
      time: 'Month 4+',
      description: 'Full transition to metabolic independence. Your body now efficiently produces its own GLP-1. Satiety is natural.',
      icon: <CheckCircle2 className="w-5 h-5 text-forest" />,
      tasks: ['Maintenance Dose', 'Metabolic Flexibility', 'Long-term Health']
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-20 border-t border-border/50">
      <div className="text-center mb-16">
        <h4 className="text-sm font-mono text-gold uppercase tracking-widest mb-4 font-bold">The Journey</h4>
        <h2 className="text-4xl font-bold text-forest mb-6">Transition Roadmap</h2>
        <p className="text-mid max-w-2xl mx-auto">
          Moving off GLP-1 medication is a process, not an event. Use this timeline to coordinate your lifestyle changes with your clinical reduction.
        </p>
      </div>

      <div className="space-y-12">
        {phases.map((phase, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-full md:w-48">
              <div className="bg-white border border-border p-6 rounded-3xl text-center shadow-sm">
                <span className="text-xs font-mono font-bold text-gold uppercase block mb-1">{phase.time}</span>
                <h3 className="text-xl font-bold text-forest">{phase.title}</h3>
              </div>
            </div>
            
            <div className="flex-1 bg-cream/30 border border-border p-8 rounded-[2rem] relative">
              <div className="flex gap-4 mb-6">
                <div className="mt-1">{phase.icon}</div>
                <p className="text-mid leading-relaxed">{phase.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {phase.tasks.map((task, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs font-bold text-forest bg-white/50 p-3 rounded-xl border border-border/50">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full" />
                    {task}
                  </div>
                ))}
              </div>
              
              {i < phases.length - 1 && (
                <div className="hidden md:block absolute -bottom-12 left-[-100px] w-0.5 h-12 bg-dashed border-l-2 border-dashed border-border" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-8 bg-sage text-white rounded-[2.5rem] text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Consult with your prescribing physician before making any changes to your medication schedule. Our tools are designed to support your lifestyle during this transition.
        </p>
        <button className="bg-gold hover:bg-gold/90 text-forest font-bold px-8 py-4 rounded-2xl transition-all">
          Download Clinical PDF Guide
        </button>
      </div>
    </div>
  );
}
