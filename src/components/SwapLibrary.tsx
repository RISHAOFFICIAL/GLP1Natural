'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Zap, Info } from 'lucide-react';
import AmazonButton from './AmazonButton';
import AdBanner from './AdBanner';

interface Swap {
  avoid: string;
  upgrade: string;
  why: string;
  neuro: string;
  glp1: string;
}

const SWAPS: Swap[] = [
  {
    avoid: 'French Fries',
    upgrade: 'Sweet Potato Fries',
    why: 'Baked sweet potato provides complex carbs without the inflammatory seed oils of deep frying.',
    neuro: 'High salt/fat craving is satisfied by sea salt and healthy fats.',
    glp1: 'High fiber content stimulates L-cells more effectively.'
  },
  {
    avoid: 'Pizza',
    upgrade: 'Cauliflower Crust Pizza',
    why: 'Reduces the massive glucose spike of white flour while keeping the savory satisfaction.',
    neuro: 'Cheese provides protein and fats that trigger satiety.',
    glp1: 'Cruciferous base increases prebiotic intake for gut health.'
  },
  {
    avoid: 'Ice Cream',
    upgrade: 'Frozen Yogurt Bark',
    why: 'Greek yogurt provides protein and probiotics instead of just sugar and cream.',
    neuro: 'Cold, sweet texture satisfies the reward system without the crash.',
    glp1: 'Probiotics heal the gut lining to improve hormone sensitivity.'
  },
  {
    avoid: 'Soda',
    upgrade: 'Sparkling Water / Kombucha',
    why: 'Eliminates HFCS which is a primary GLP-1 blocker.',
    neuro: 'Carbonation provides the mouthfeel you crave.',
    glp1: 'Kombucha provides organic acids that stimulate satiety.'
  },
  {
    avoid: 'Cookies',
    upgrade: 'Dark Chocolate + Nuts',
    why: 'Magnesium and healthy fats replace refined sugar and flour.',
    neuro: 'Cocoa triggers dopamine release more sustainably than sugar.',
    glp1: 'Nuts are a powerful trigger for natural GLP-1 release.'
  },
  {
    avoid: 'Chips',
    upgrade: 'Veggie Dippers + Hummus',
    why: 'Provides crunch and salt without the acrilamides and seed oils.',
    neuro: 'Crunch satisfies the mechanical urge to chew.',
    glp1: 'Chickpeas are a premier prebiotic fiber source.'
  },
  {
    avoid: 'Fast Food Burger',
    upgrade: 'Lettuce Wrap Burger',
    why: 'Removing the bun eliminates the refined carb spike.',
    neuro: 'High protein and fat focus hits the satiety center directly.',
    glp1: 'Increases protein-to-carb ratio, a key GLP-1 trigger.'
  },
  {
    avoid: 'Pancakes',
    upgrade: 'Oat Blender Pancakes',
    why: 'Whole oats provide slow-burning energy compared to flour.',
    neuro: 'Satisfies the desire for a warm, comforting breakfast.',
    glp1: 'Beta-glucans in oats are proven to increase GLP-1 levels.'
  }
];

export default function SwapLibrary() {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [customCraving, setCustomCraving] = useState('');
  const [customSwap, setCustomSwap] = useState<{ neuroscience: string, swaps: { name: string, why: string }[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCustomSwap = async () => {
    if (!customCraving) return;
    setLoading(true);
    try {
      const res = await fetch('/api/custom-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ craving: customCraving })
      });
      const data = await res.json();
      setCustomSwap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSwaps = SWAPS.filter(s => 
    s.avoid.toLowerCase().includes(search.toLowerCase()) || 
    s.upgrade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-forest mb-2">Swap Library</h2>
          <p className="text-mid">Turn your cravings into metabolic wins.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mid" />
          <input
            type="text"
            placeholder="Search cravings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSwaps.map((swap, i) => (
          <div 
            key={i} 
            className={`bg-white border transition-all duration-300 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden ${expandedIndex === i ? 'border-sage shadow-lg' : 'border-border hover:border-sage/50 shadow-sm'}`}
          >
            <button 
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="w-full p-5 md:p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-red-soft line-through decoration-red-soft/50 uppercase tracking-widest">{swap.avoid}</span>
                  <span className="text-base md:text-lg font-bold text-forest">{swap.upgrade}</span>
                </div>
              </div>
              {expandedIndex === i ? <ChevronUp className="w-5 h-5 text-mid" /> : <ChevronDown className="w-5 h-5 text-mid" />}
            </button>

            {expandedIndex === i && (
              <div className="px-5 pb-5 md:px-6 md:pb-6 space-y-6">
                <div className="p-4 md:p-5 bg-sage-pale/30 rounded-2xl border border-sage/10">
                  <h4 className="text-xs font-bold text-sage uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Why it works
                  </h4>
                  <p className="text-sm text-charcoal leading-relaxed">{swap.why}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">Neurology</span>
                    <p className="text-[11px] text-mid leading-tight">{swap.neuro}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-sage uppercase tracking-tighter">GLP-1 Benefit</span>
                    <p className="text-[11px] text-mid leading-tight">{swap.glp1}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap justify-between items-center gap-4">
                  <AmazonButton ingredient={swap.upgrade.split(' ')[0]} />
                  <div className="flex items-center gap-1 text-gold">
                    <Zap className="w-4 h-4 fill-gold" />
                    <span className="text-[10px] md:text-xs font-bold uppercase">Natural Boost</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ad Placement */}
      <AdBanner slot="swap-library-mid" className="mt-8" />
      
      {/* Custom AI Craving Box */}
      <div className="mt-12 bg-forest p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-center text-cream shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 font-serif italic text-gold">Have a specific craving?</h3>
          <p className="text-cream/70 mb-8 max-w-md mx-auto text-sm">Our AI can design a custom metabolic swap for anything on your mind.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="text" 
              placeholder="e.g. 'I'm craving a Reese's...'"
              value={customCraving}
              onChange={(e) => setCustomCraving(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
            />
            <button 
              onClick={handleCustomSwap}
              disabled={loading}
              className="bg-gold text-forest font-bold px-8 py-4 rounded-2xl hover:bg-gold/90 transition-all disabled:opacity-50 text-sm"
            >
              {loading ? 'Thinking...' : 'Swap'}
            </button>
          </div>

          {customSwap && (
            <div className="mt-8 text-left bg-white/5 p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-4">
                <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest block mb-2">The Neuroscience</span>
                <p className="text-sm text-cream/90 italic leading-relaxed">{customSwap.neuroscience}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customSwap.swaps.map((s, idx) => (
                  <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-gold block mb-1">{s.name}</span>
                    <p className="text-[11px] text-cream/70 leading-tight">{s.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Decorative element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
