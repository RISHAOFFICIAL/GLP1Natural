import { ShieldCheck, Zap, Activity, Brain } from 'lucide-react';
import AdBanner from './AdBanner';

export default function ScienceSection() {
  const points = [
    {
      title: 'L-Cell Activation',
      description: 'Your gut contains L-cells that produce natural GLP-1. Specific nutrients like fiber and amino acids act as keys to unlock these cells.',
      icon: <Zap className="w-6 h-6 text-gold" />
    },
    {
      title: 'The Seed Oil Sabotage',
      description: 'Processed seed oils cause chronic low-grade inflammation in the gut, which desensitizes your natural hunger signaling.',
      icon: <ShieldCheck className="w-6 h-6 text-red-soft" />
    },
    {
      title: 'Hormonal Harmony',
      description: 'By stabilizing glucose, we reduce insulin spikes, allowing your body to access stored fat for energy instead of constant hunger.',
      icon: <Activity className="w-6 h-6 text-sage" />
    },
    {
      title: 'Neurological Freedom',
      description: 'Natural GLP-1 crosses the blood-brain barrier to quiet "food noise" and restore your brain\'s reward system.',
      icon: <Brain className="w-6 h-6 text-purple-soft" />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-20 border-t border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h4 className="text-sm font-mono text-gold uppercase tracking-widest mb-4 font-bold">Deep Dive</h4>
          <h2 className="text-4xl font-bold text-forest mb-6">The Science of Natural GLP-1</h2>
          <p className="text-mid leading-relaxed mb-8">
            GLP-1 (Glucagon-like peptide-1) is a hormone naturally produced in your small intestine. While medications provide a synthetic version, your body is fully capable of producing its own when given the right metabolic signals.
          </p>
          <div className="space-y-6">
            {points.map((point, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">{point.icon}</div>
                <div>
                  <h3 className="font-bold text-forest mb-1">{point.title}</h3>
                  <p className="text-sm text-mid leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-cream p-8 rounded-[3rem] border border-gold/20 shadow-inner relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          <h3 className="text-xl font-bold text-forest mb-6 text-center italic">The "Red Flag" List</h3>
          <p className="text-xs text-mid text-center mb-8 uppercase tracking-widest font-bold">Avoid these to protect your L-Cells</p>
          
          <div className="space-y-4">
            {[
              { name: 'Seed Oils', detail: 'Soybean, Canola, Grapeseed' },
              { name: 'HFCS', detail: 'High Fructose Corn Syrup' },
              { name: 'Artificial Sugars', detail: 'Sucralose, Aspartame' },
              { name: 'Emulsifiers', detail: 'Carrageenan, Gums' },
              { name: 'Refined Carbs', detail: 'White Flour, Sugar' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-border/50">
                <div>
                  <span className="font-bold text-forest block">{item.name}</span>
                  <span className="text-[10px] text-mid uppercase">{item.detail}</span>
                </div>
                <div className="w-2 h-2 bg-red-soft rounded-full shadow-[0_0_8px_rgba(232,97,74,0.6)]" />
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-sage/10 rounded-2xl border border-sage/20 text-center">
            <p className="text-xs text-sage font-medium italic">
              "Healing your metabolism starts with removing the blockers."
            </p>
          </div>
        </div>
      </div>
      
      {/* Ad Placement */}
      <div className="mt-20">
        <AdBanner slot="science-footer" />
      </div>
    </div>
  );
}
