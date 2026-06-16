import MealMoment from '@/components/MealMoment';
import FoodScanner from '@/components/FoodScanner';
import MealBuilder from '@/components/MealBuilder';
import ProtocolSection from '@/components/ProtocolSection';
import ScienceSection from '@/components/ScienceSection';
import SwapLibrary from '@/components/SwapLibrary';
import WeaningTimeline from '@/components/WeaningTimeline';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 py-6 flex justify-between items-center border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-forest tracking-tight">
            GLP<span className="text-gold">·</span>1 Natural
          </h1>
        </div>
        <div className="bg-sage/10 px-3 py-1 rounded-full">
          <span className="text-[10px] font-mono font-bold text-sage uppercase tracking-widest">
            Wean Naturally
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 pt-16 md:pt-24 pb-12 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold text-forest mb-8 leading-[1.05]">
            Your body already makes <br />
            <span className="italic text-gold font-serif">its own GLP-1.</span>
          </h2>
          <p className="text-lg md:text-2xl text-mid max-w-2xl mx-auto mb-12 leading-relaxed">
            Feed it the right way and you'll never need a prescription to maintain your results.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-mid uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Science-backed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Hormone-first approach
            </span>
          </div>
        </section>

        {/* Meal Moment Widget */}
        <section className="px-6 mb-24">
          <MealMoment />
        </section>

        {/* Daily Meal Builder Section */}
        <section id="builder" className="px-6 mb-32">
          <div className="text-center mb-12">
            <h3 className="text-xs font-mono tracking-widest text-gold uppercase mb-4 font-bold">Meal Planning</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-forest mb-4">Daily Meal Builder</h2>
            <p className="text-mid max-w-lg mx-auto text-lg">
              Select your foods and let our AI calculate your GLP-1 score and metabolic sequence.
            </p>
          </div>
          <MealBuilder />
        </section>

        {/* Protocol Section */}
        <section className="px-6 bg-cream/20 py-24 mb-32">
          <ProtocolSection />
        </section>

        {/* Food Scanner Section */}
        <section className="px-6 max-w-4xl mx-auto mb-32">
          <div className="text-center mb-12">
            <h3 className="text-xs font-mono tracking-widest text-gold uppercase mb-4 font-bold">Core Feature</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-forest mb-4">Metabolic Scanner</h2>
            <p className="text-mid max-w-lg mx-auto text-lg">
              Scan labels, plates, or ingredient lists to reveal GLP-1 blockers and natural swaps.
            </p>
          </div>
          <FoodScanner />
        </section>

        {/* Swap Library Section */}
        <section className="px-6 mb-32">
          <SwapLibrary />
        </section>

        {/* Science Section */}
        <section className="px-6 bg-white">
          <ScienceSection />
        </section>

        {/* Weaning Timeline Section */}
        <section className="px-6">
          <WeaningTimeline />
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-border/30 text-center bg-cream/10">
        <p className="text-xs font-mono text-mid uppercase tracking-widest">
          Built by Risha Smith · GLP·1 Natural · 2026
        </p>
      </footer>
    </div>
  );
}
