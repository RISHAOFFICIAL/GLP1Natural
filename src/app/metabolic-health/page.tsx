'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight, Check, Star, Menu, X, ChevronDown, Camera, Sparkles,
  Clock, Apple, Brain, Users, TrendingUp, Shield, Activity, Heart, Zap
} from 'lucide-react';

/* ============================================
   Metabolic Health Landing Page
   Target keyword: "metabolic health nutrition"
   Design: Forest/Sage/Gold/Cream
   ============================================ */

// --- FAQ Data ---
const faqs = [
  {
    q: "What exactly is metabolic health?",
    a: "Metabolic health means your body efficiently converts food into energy, maintains stable blood sugar, and regulates hunger hormones like GLP-1 naturally. Good metabolic health is associated with healthy weight, steady energy levels, and reduced risk of chronic conditions."
  },
  {
    q: "How does GLP-1 affect metabolism?",
    a: "GLP-1 (Glucagon-Like Peptide-1) is a key metabolic hormone. It signals fullness to your brain, slows digestion for steady energy release, and helps regulate insulin. By naturally boosting GLP-1 through nutrition, you support your entire metabolic system."
  },
  {
    q: "Can nutrition really improve my metabolic health?",
    a: "Absolutely. Research shows that food sequencing, meal timing, and specific nutrients can significantly impact GLP-1 production, insulin sensitivity, and metabolic rate. The Eat-in-Order protocol alone can amplify GLP-1 release by up to 45%."
  },
  {
    q: "How is the GLP-1 Score calculated?",
    a: "Our AI analyzes over 15 factors in each meal including fiber content, protein quality, glycemic load, food order, and nutrient density. The score reflects how well a meal supports your body's natural GLP-1 production and overall metabolic health."
  },
  {
    q: "How quickly will I notice changes?",
    a: "Many users report improved energy stability and reduced cravings within the first week. GLP-1 Score improvements are typically measurable within 3-5 days of following the protocol."
  },
  {
    q: "Do I need to be on medication to use this?",
    a: "Not at all. GLP·1 Natural is designed for anyone interested in optimizing their metabolic health — whether you're currently on medication, transitioning off, or simply want to support your body's natural hormone function."
  },
  {
    q: "What's the science behind the Eat-in-Order protocol?",
    a: "The protocol is based on peer-reviewed research showing that eating fiber first, followed by protein, fats, and finally carbohydrates maximizes GLP-1 secretion and minimizes blood sugar spikes. This sequencing leverages your body's natural hormonal responses."
  }
];

// --- Features Data ---
const features = [
  {
    id: 'meal-moment',
    icon: Clock,
    title: 'Meal Moment',
    subtitle: 'Eat in the right order — without thinking about it',
    desc: 'Start your Meal Moment timer when you eat. The app guides you through food sequencing step by step to optimize your metabolic response.',
    stat: '+45%',
    statLabel: 'GLP-1 boost',
    gradient: 'from-forest to-sage'
  },
  {
    id: 'food-scanner',
    icon: Camera,
    title: 'Food Scanner',
    subtitle: 'Snap a photo. Get an instant metabolic score.',
    desc: 'Scan any meal or ingredient to see its GLP-1 impact score. Get personalized swap suggestions for better metabolic outcomes.',
    stat: '92',
    statLabel: 'Avg. premium score',
    gradient: 'from-gold to-amber-500'
  },
  {
    id: 'meal-builder',
    icon: Sparkles,
    title: 'AI Meal Builder',
    subtitle: 'Personalized meals for your metabolism',
    desc: 'Our AI builds meals optimized for your unique metabolic profile, preferences, and health goals — with automatic grocery lists.',
    stat: '100%',
    statLabel: 'Personalized',
    gradient: 'from-sage-light to-sage'
  }
];

// --- Testimonials Data ---
const testimonials = [
  {
    quote: "I never realized how much my eating order affected my energy. The Meal Moment feature transformed my relationship with food. My blood sugar is stable, my cravings are gone, and I've lost 18 lbs without feeling deprived.",
    name: "Sarah M.",
    age: 34,
    location: "Portland",
    type: "Energy"
  },
  {
    quote: "I've spent years trying to optimize my health. Nothing has been as simple and effective as the Eat-in-Order protocol. The Food Scanner showed me which 'healthy' foods were actually spiking my blood sugar.",
    name: "James L.",
    age: 42,
    location: "Denver",
    type: "Optimization"
  },
  {
    quote: "As a dietitian, I was skeptical. But the science checks out. I now recommend GLP·1 Natural to clients who want to understand their metabolic health on a deeper level. The data is invaluable.",
    name: "Dr. Amara K.",
    age: 39,
    location: "Seattle",
    type: "Professional"
  }
];

// ============================================
// COMPONENTS
// ============================================

function CTAButton({ children, variant = 'primary', href = '#signup', className = '', onClick }: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 text-sm md:text-base px-6 py-3.5';
  const variants = {
    primary: 'bg-gold hover:bg-amber-500 text-forest shadow-lg shadow-gold/20 hover:shadow-gold/30',
    secondary: 'bg-forest hover:bg-forest/90 text-cream border border-sage/30',
    ghost: 'text-mid hover:text-forest underline underline-offset-4 decoration-gold/40 hover:decoration-gold'
  };
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {label && (
        <p className="text-xs font-mono tracking-[0.2em] text-gold uppercase mb-4 font-bold">{label}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-forest mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-mid max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !dismissed && !submitted) setVisible(true);
  }, [dismissed, submitted]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (typeof window !== 'undefined' && (window as any).gtag)
        (window as any).gtag('event', 'lp_metabolic_email_capture', { position: 'exit_intent' });
      setSubmitted(true);
    }
  };

  if (dismissed || submitted) return null;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-cream rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={() => { setVisible(false); setDismissed(true); }} className="absolute top-4 right-4 text-mid hover:text-charcoal" aria-label="Close"><X size={20} /></button>
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-forest mb-2">Unlock your metabolic potential.</h3>
                <p className="text-mid mb-6">Get our free <strong className="text-forest">"7-Day Metabolic Reset Meal Plan"</strong> when you join our mailing list.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-charcoal placeholder:text-mid/50 focus:outline-none focus:ring-2 focus:ring-gold/40" />
                  <CTAButton variant="primary" className="w-full justify-center text-base">Send Me the Plan <ArrowRight size={18} /></CTAButton>
                </form>
                <p className="text-xs text-mid/60 mt-4 text-center">✓ No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div className="text-center py-6">
                <Check size={48} className="text-sage mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-forest mb-2">Check your inbox!</h3>
                <p className="text-mid">You'll get the meal plan + a 7-day free trial of Premium.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function MetabolicHealthLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct > 0.25 && (window as any).__mscroll25 === undefined) {
        (window as any).__mscroll25 = true;
        if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'lp_metabolic_scroll_25');
      }
      if (scrollPct > 0.75 && (window as any).__mscroll75 === undefined) {
        (window as any).__mscroll75 = true;
        if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'lp_metabolic_scroll_75');
      }
    };
    window.addEventListener('scroll', handleScroll);
    if (typeof window !== 'undefined' && (window as any).gtag)
      (window as any).gtag('event', 'lp_metabolic_health_view');
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackCta = (position: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag)
      (window as any).gtag('event', 'lp_metabolic_cta', { position });
  };

  return (
    <>
      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })
      }} />

      <div className="min-h-screen bg-cream text-charcoal">

        {/* ===== NAVBAR ===== */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-lg border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Zap size={22} className="text-gold" />
              <span className="text-lg font-bold text-forest tracking-tight">GLP<span className="text-gold">·</span>1 Natural</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-mid hover:text-forest transition-colors">How It Works</a>
              <a href="#features" className="text-sm text-mid hover:text-forest transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-mid hover:text-forest transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-mid hover:text-forest transition-colors">FAQ</a>
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('nav')}>Free Trial <ArrowRight size={16} /></CTAButton>
            </div>
            <button className="md:hidden text-forest p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-cream border-t border-border/30 px-4 py-4 space-y-3">
              <a href="#how-it-works" className="block text-mid hover:text-forest py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#features" className="block text-mid hover:text-forest py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#pricing" className="block text-mid hover:text-forest py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="block text-mid hover:text-forest py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <CTAButton variant="primary" href="#signup" className="w-full justify-center" onClick={() => trackCta('nav_mobile')}>Free Trial <ArrowRight size={16} /></CTAButton>
            </div>
          )}
        </nav>

        {/* ===== 1. HERO ===== */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-sage/10 border border-sage/20 rounded-full px-4 py-1.5 mb-8">
              <Activity size={14} className="text-sage" />
              <span className="text-[11px] font-mono font-bold text-sage uppercase tracking-widest">Metabolic Health</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-forest leading-[1.05] mb-6 tracking-tight">
              Reclaim Your<br />
              <span className="italic text-gold font-serif">Metabolic Health</span><br />
              Through the Power of Food
            </h1>
            <p className="text-lg md:text-xl text-mid max-w-3xl mx-auto mb-10 leading-relaxed">
              Your metabolism isn't broken — it just needs the right signals. Discover how the science-backed Eat-in-Order protocol naturally optimizes your body's hormone response.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('hero')}>Start Your Free Trial <ArrowRight size={18} /></CTAButton>
              <CTAButton variant="ghost" href="#how-it-works">See How It Works ↓</CTAButton>
            </div>
            <p className="text-xs text-mid/60 mb-6">No credit card required. 7 days free.</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)} <span className="text-mid ml-1">4.8/5</span>
              </div>
              <div className="flex items-center gap-1.5 text-forest">
                <Users size={16} className="text-sage" /> <span>15,000+ active users</span>
              </div>
              <div className="flex items-center gap-1.5 text-forest">
                <Heart size={16} className="text-sage" /> <span>Science-backed nutrition</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. THE METABOLIC HEALTH PROBLEM ===== */}
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              label="The Reality"
              title="Your metabolism is talking. Are you listening?"
              subtitle="Modern eating patterns — processed foods, erratic schedules, poor food sequencing — have disrupted our natural metabolic signals. The result? Constant cravings, energy crashes, and weight that won't budge."
            />
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
              {[
                { icon: <TrendingUp size={28} />, title: 'Blood Sugar Rollercoaster', desc: 'Spikes and crashes throughout the day leave you tired, hungry, and reaching for more carbs' },
                { icon: <Brain size={28} />, title: 'Misguided Hunger Signals', desc: 'Your natural GLP-1 production is suppressed by poor food sequencing and processed foods' },
                { icon: <Zap size={28} />, title: 'Sluggish Metabolism', desc: 'Without the right nutritional signals, your metabolic rate settles below its natural potential' }
              ].map((item, i) => (
                <div key={i} className="bg-cream rounded-2xl p-6 md:p-8 border border-border/40 hover:border-sage/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage mb-4 group-hover:bg-sage/20 transition-colors">{item.icon}</div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-forest font-semibold mt-10 italic">Your body has an incredible capacity for self-regulation. It just needs the right nutritional guidance.</p>
          </div>
        </section>

        {/* ===== 3. THE SCIENCE ===== */}
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              label="The Science"
              title="How nutrition rewires your metabolic health"
              subtitle="Three scientifically-proven mechanisms that naturally restore your body's metabolic function through food alone."
            />
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
              {[
                { icon: <Clock size={24} />, title: 'Eat-in-Order Protocol', desc: 'Eating fiber-rich vegetables first, then protein, fats, and finally carbohydrates can amplify GLP-1 release by up to 45%', stat: '+45%', statLabel: 'GLP-1 increase' },
                { icon: <Apple size={24} />, title: 'GLP-1 Boosting Nutrition', desc: 'Specific foods — avocado, eggs, leafy greens, berries — contain compounds that directly stimulate GLP-1 secretion', stat: '27+', statLabel: 'Boosting foods identified' },
                { icon: <Brain size={24} />, title: 'Circadian Alignment', desc: 'When you eat matters as much as what you eat. Meal timing synchronized with your body clock optimizes hormone response', stat: '3×', statLabel: 'Better metabolic response' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-border/40 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-forest/5 flex items-center justify-center text-forest mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-forest mb-3">{item.title}</h3>
                  <p className="text-mid text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-gold">{item.stat}</span>
                    <span className="text-xs text-mid">{item.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-mid/60 mt-8 italic max-w-2xl mx-auto">Based on peer-reviewed research published in Nature Metabolism, Diabetes Care, Cell Metabolism, and The Journal of Clinical Endocrinology &amp; Metabolism.</p>
          </div>
        </section>

        {/* ===== 4. FEATURES TABBED DEMO ===== */}
        <section id="features" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="The Tools" title="Everything you need to restore metabolic balance" />
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {features.map((feat, i) => (
                <button key={feat.id} onClick={() => setActiveFeature(i)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeFeature === i ? 'bg-forest text-cream shadow-lg' : 'bg-cream text-mid hover:text-forest border border-border/40'}`}>
                  <feat.icon size={18} /> {feat.title}
                </button>
              ))}
            </div>
            <div className="bg-cream rounded-2xl border border-border/40 p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-forest/10 to-sage/10 rounded-lg px-3 py-1.5 mb-4">
                    <features[activeFeature].icon size={16} className="text-sage" />
                    <span className="text-xs font-mono font-bold text-sage uppercase tracking-wider">{features[activeFeature].title}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-forest mb-3">{features[activeFeature].subtitle}</h3>
                  <p className="text-mid leading-relaxed mb-6">{features[activeFeature].desc}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-gold">{features[activeFeature].stat}</span>
                    <span className="text-sm text-mid">{features[activeFeature].statLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-mid italic">
                    <Check size={14} className="text-sage" />
                    Available in all Premium plans
                  </div>
                </div>
                <div className="w-full md:w-56 h-80 bg-gradient-to-b rounded-2xl flex items-center justify-center border border-border/50 shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #1E3A2B 0%, #4A7C59 100%)' }}>
                  <div className="text-center p-6">
                    <features[activeFeature].icon size={32} className="text-gold mx-auto mb-3 opacity-80" />
                    <p className="text-cream/80 text-sm font-semibold">{features[activeFeature].title}</p>
                    <p className="text-cream/40 text-xs mt-1">App preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. SOCIAL PROOF ===== */}
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="Real Results" title="People are transforming their metabolic health" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[{ number: '15,000+', label: 'Active Users' }, { number: '89%', label: 'Improved GLP-1 Scores' }, { number: '4.8★', label: 'App Store Rating' }, { number: '72%', label: 'Report better energy' }].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 md:p-6 text-center border border-border/40">
                  <p className="text-2xl md:text-3xl font-bold text-forest">{stat.number}</p>
                  <p className="text-xs text-mid mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-border/40 relative">
                  <div className="absolute top-4 right-4"><span className="text-[10px] font-mono font-bold text-sage uppercase tracking-widest bg-sage/10 px-2 py-1 rounded">{t.type}</span></div>
                  <div className="flex items-center gap-1 text-gold mb-4">{[...Array(5)].map((_, si) => <Star key={si} size={13} fill="currentColor" />)}</div>
                  <p className="text-sm text-mid leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">{t.name.charAt(0)}</div>
                    <div><p className="text-sm font-semibold text-forest">{t.name}</p><p className="text-xs text-mid">{t.age}, {t.location}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('social_proof')}>Start Your Metabolic Journey <ArrowRight size={18} /></CTAButton>
            </div>
          </div>
        </section>

        {/* ===== 6. HOW IT WORKS ===== */}
        <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeading label="Simple Start" title="Know your metabolic baseline in under 3 minutes" />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[{ step: '01', title: 'Quick Health Profile', desc: 'Share your goals, eating patterns, and health history for a personalized baseline' },
                { step: '02', title: 'Scan Your First Meal', desc: 'Use the Food Scanner to see how your current eating habits affect your GLP-1 Score' },
                { step: '03', title: 'Get Your Metabolic Plan', desc: 'Receive a personalized Eat-in-Order protocol with meal plans tailored to your profile' }
              ].map((item, i) => (
                <div key={i} className="text-center relative">
                  {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />}
                  <div className="w-16 h-16 rounded-full bg-forest text-cream text-xl font-bold flex items-center justify-center mx-auto mb-5 relative z-10">{item.step}</div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-sm text-mid leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('how_it_works')}>Start Your 7-Day Free Trial <ArrowRight size={18} /></CTAButton>
            </div>
          </div>
        </section>

        {/* ===== 7. PRICING ===== */}
        <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-4xl mx-auto">
            <SectionHeading label="Pricing" title="Start free. Upgrade when you're ready." />
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-border/40">
                <h3 className="text-xl font-bold text-forest mb-1">Free</h3>
                <p className="text-3xl font-bold text-forest mb-6">$0 <span className="text-sm font-normal text-mid">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {['3 Meal Moments per week', 'Swap Library access', 'Educational content & recipes', 'Basic GLP-1 Score'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-mid"><Check size={16} className="text-sage shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
                <CTAButton variant="secondary" href="#signup" className="w-full justify-center" onClick={() => trackCta('pricing_free')}>Get Started Free</CTAButton>
              </div>
              <div className="bg-forest rounded-2xl p-8 text-cream relative border-2 border-gold/30 shadow-xl">
                <div className="absolute -top-3 right-6 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="text-xl font-bold mb-1">Premium</h3>
                <p className="text-3xl font-bold mb-6">$9.99 <span className="text-sm font-normal text-cream/60">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {['Unlimited Meal Moments', 'AI Food Scanner (unlimited)', 'Full AI Meal Builder', 'Personalized meal plans', 'Priority support', 'Grocery list exports'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-cream/80"><Check size={16} className="text-gold shrink-0 mt-0.5" /><span>{item}</span></li>
                  ))}
                </ul>
                <CTAButton variant="primary" href="#signup" className="w-full justify-center" onClick={() => trackCta('pricing_premium')}>Try Premium Free for 7 Days <ArrowRight size={18} /></CTAButton>
                <p className="text-xs text-cream/40 text-center mt-3">Cancel anytime. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 8. FAQ ===== */}
        <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <SectionHeading label="FAQ" title="Your metabolic health questions, answered." />
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border/50 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left bg-cream/50 hover:bg-cream transition-colors" aria-expanded={openFaq === i}>
                    <span className="font-semibold text-forest text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown size={18} className={`text-sage shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-mid leading-relaxed border-t border-border/30 pt-4 bg-white">{faq.a}</div>}
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <CTAButton variant="ghost" href="#signup" onClick={() => trackCta('faq')}>Start Your Metabolic Journey →</CTAButton>
            </div>
          </div>
        </section>

        {/* ===== 9. FINAL CTA ===== */}
        <section id="signup" className="py-20 md:py-28 px-4 sm:px-6 bg-forest relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-light/10 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 leading-tight">
              Your metabolic health is waiting.<br />
              <span className="text-gold">Let's unlock it together.</span>
            </h2>
            <p className="text-lg text-cream/70 mb-10 max-w-xl mx-auto">15,000+ people have already transformed their metabolic health. Start your journey today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <CTAButton variant="primary" href="/" onClick={() => trackCta('final')}>Start Your Free Trial <ArrowRight size={18} /></CTAButton>
            </div>
            <p className="text-sm text-cream/40">No credit card required</p>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-cream/50">
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Backed by nutritional science</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Privacy first — your health data stays yours</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> US-based customer support</span>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="px-6 py-12 border-t border-border/30 text-center bg-cream">
          <a href="/" className="inline-flex items-center gap-2 mb-4"><Zap size={18} className="text-gold" /><span className="text-base font-bold text-forest tracking-tight">GLP<span className="text-gold">·</span>1 Natural</span></a>
          <p className="text-xs font-mono text-mid/60 uppercase tracking-widest">Built by Risha Smith · GLP·1 Natural · 2026</p>
        </footer>
      </div>
      <ExitIntentPopup />
    </>
  );
}