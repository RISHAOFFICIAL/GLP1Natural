'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Check, Star, Menu, X, ChevronDown, Camera, Sparkles, Clock, Apple, Leaf, Brain, Users, TrendingUp, Shield } from 'lucide-react';

/* ============================================
   Natural Ozempic Alternatives - Landing Page
   Design: Forest/Sage/Gold/Cream
   SEO Target: "natural ozempic alternative"
   ============================================ */

// --- FAQ Data ---
const faqs = [
  {
    q: "Can I really replace Ozempic with food?",
    a: "GLP·1 Natural is not a replacement for prescribed medication. It's a nutrition protocol designed to support your body's natural GLP-1 production. Many users work with their doctors to transition off medication while using the app. Always consult your physician before making changes to your medication."
  },
  {
    q: "How is the GLP-1 Score calculated?",
    a: "Our score is based on peer-reviewed research on how different nutrients, food sequences, and meal timing affect GLP-1 secretion. The AI analyzes over 15 factors in each meal, including fiber content, protein quality, glycemic load, and food order."
  },
  {
    q: "How quickly will I see results?",
    a: "Most users see measurable improvements in their GLP-1 Scores within the first week. Many report reduced cravings and more stable energy by day 3."
  },
  {
    q: "Do I need to be on GLP-1 medication to use this?",
    a: "Not at all. GLP·1 Natural is for anyone interested in optimizing their metabolic health. Whether you're currently on medication, weaning off, or never taken it — the protocol works the same way."
  },
  {
    q: "What's the \"Eat-in-Order\" protocol?",
    a: "It's a simple method of eating your meal in a specific sequence: fiber-rich vegetables first, then protein, then fats, finally carbohydrates. This order maximizes GLP-1 release and stabilizes blood sugar. The app guides you through it."
  },
  {
    q: "Can I use this alongside my current medication?",
    a: "Yes. Many users start using GLP·1 Natural while still on medication to build healthy habits before transitioning off. We recommend consulting your doctor."
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Your first 7 days of Premium are completely free. If you're not satisfied, cancel before the trial ends and you won't be charged. No questions asked."
  }
];

// --- Features Data ---
const features = [
  {
    id: 'meal-moment',
    icon: Clock,
    title: 'Meal Moment',
    subtitle: 'Eat in the right order — without thinking about it',
    desc: 'Start your Meal Moment timer when you eat. The app guides you through food sequencing step by step. Track your GLP-1 Score for each meal and watch it improve.',
    testimonial: '"My GLP-1 Score went from 42 to 91 in two weeks." — James, beta user',
    gradient: 'from-forest to-sage'
  },
  {
    id: 'food-scanner',
    icon: Camera,
    title: 'Food Scanner',
    subtitle: 'Snap a photo. Get an instant GLP-1 Score.',
    desc: 'Scan any meal or ingredient. Our AI analyzes the nutrient profile and tells you how well it supports GLP-1 production. Swap suggestions for low-score meals.',
    testimonial: 'Swap Library — find high-GLP-1 alternatives for any food',
    gradient: 'from-gold to-amber-500'
  },
  {
    id: 'meal-builder',
    icon: Sparkles,
    title: 'AI Meal Builder',
    subtitle: 'Personalized meals that optimize your hormones',
    desc: 'Tell the AI your preferences, restrictions, and goals. It builds meals designed to maximize GLP-1 release while keeping you satisfied.',
    testimonial: 'Premium feature: Full AI Meal Builder with grocery list generation',
    gradient: 'from-sage-light to-sage'
  }
];

// --- Testimonials Data ---
const testimonials = [
  {
    quote: "I was terrified to stop Ozempic after losing 35 lbs. GLP·1 Natural gave me a plan. I weaned off over 8 weeks while using the Meal Moment feature. That was 6 months ago — I've kept the weight off and my cravings are actually lower than when I was on the medication.",
    name: "Michelle K.",
    age: 47,
    location: "Los Angeles",
    type: "Transition"
  },
  {
    quote: "Never took Ozempic but my mom is on it. I wanted to get ahead of my metabolic health. The Food Scanner taught me which foods spike my blood sugar. Down 22 lbs and my A1C dropped from 5.8 to 5.2.",
    name: "David R.",
    age: 38,
    location: "Austin",
    type: "Prevention"
  },
  {
    quote: "Hit my goal weight on Wegovy and my doctor said 'keep doing what you're doing.' But what was I doing? GLP·1 Natural gave me a structured way to eat that keeps the weight off without the shot.",
    name: "Priya S.",
    age: 52,
    location: "Chicago",
    type: "Maintenance"
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
    if (e.clientY <= 0 && !dismissed && !submitted) {
      setVisible(true);
    }
  }, [dismissed, submitted]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lp_email_capture', { position: 'exit_intent' });
      }
      setSubmitted(true);
    }
  };

  if (dismissed || submitted) return null;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-cream rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => { setVisible(false); setDismissed(true); }}
              className="absolute top-4 right-4 text-mid hover:text-charcoal"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold text-forest mb-2">Wait — don't lose this.</h3>
                <p className="text-mid mb-6">
                  Get our free <strong className="text-forest">"5 GLP-1 Boosting Breakfast Recipes"</strong> PDF when you join our mailing list.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-charcoal placeholder:text-mid/50 focus:outline-none focus:ring-2 focus:ring-gold/40"
                  />
                  <CTAButton variant="primary" className="w-full justify-center text-base">
                    Send Me the Recipes <ArrowRight size={18} />
                  </CTAButton>
                </form>
                <p className="text-xs text-mid/60 mt-4 text-center">✓ No spam. Unsubscribe anytime.</p>
              </>
            ) : (
              <div className="text-center py-6">
                <Check size={48} className="text-sage mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-forest mb-2">Check your inbox!</h3>
                <p className="text-mid">You'll get the recipes + a 7-day free trial of Premium.</p>
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

export default function NaturalOzempicLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct > 0.25 && (window as any).__scroll25 === undefined) {
        (window as any).__scroll25 = true;
        if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'lp_scroll_25');
      }
      if (scrollPct > 0.75 && (window as any).__scroll75 === undefined) {
        (window as any).__scroll75 = true;
        if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'lp_scroll_75');
      }
    };
    window.addEventListener('scroll', handleScroll);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lp_ozempic_alternatives_view');
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackCta = (position: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lp_cta_click', { position });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          })
        }}
      />

      <div className="min-h-screen bg-cream text-charcoal">
        <nav className="fixed top-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-lg border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2">
              <Leaf size={22} className="text-sage" />
              <span className="text-lg font-bold text-forest tracking-tight">GLP<span className="text-gold">·</span>1 Natural</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-mid hover:text-forest transition-colors">How It Works</a>
              <a href="#features" className="text-sm text-mid hover:text-forest transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-mid hover:text-forest transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-mid hover:text-forest transition-colors">FAQ</a>
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('nav')}>
                Free Trial <ArrowRight size={16} />
              </CTAButton>
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
              <CTAButton variant="primary" href="#signup" className="w-full justify-center" onClick={() => trackCta('nav_mobile')}>
                Free Trial <ArrowRight size={16} />
              </CTAButton>
            </div>
          )}
        </nav>

        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-sage/10 border border-sage/20 rounded-full px-4 py-1.5 mb-8">
              <Shield size={14} className="text-sage" />
              <span className="text-[11px] font-mono font-bold text-sage uppercase tracking-widest">Science-Backed Protocol</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-forest leading-[1.05] mb-6 tracking-tight">
              Stop Relying on Injections.<br />
              <span className="italic text-gold font-serif">Start Activating</span> Your Body's Natural GLP-1.
            </h1>
            <p className="text-lg md:text-xl text-mid max-w-3xl mx-auto mb-10 leading-relaxed">
              The science-backed nutrition protocol that helps you transition off GLP-1 medications and maintain your results — naturally.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <CTAButton variant="primary" href="#signup" onClick={() => trackCta('hero')}>
                Start Your Free Trial <ArrowRight size={18} />
              </CTAButton>
              <CTAButton variant="ghost" href="#how-it-works">Learn how it works ↓</CTAButton>
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
                <Check size={16} className="text-sage" /> <span>Backed by nutritional science</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="The Challenge" title="You've come this far. Now what?" subtitle="GLP-1 medications like Ozempic and Wegovy have helped millions lose weight. But 68% of users regain weight within 12 months of stopping." />
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
              {[
                { icon: <TrendingUp size={28} />, title: 'Medication dependency', desc: "You're not sure if you can maintain results without the shot" },
                { icon: <Apple size={28} />, title: 'No nutrition roadmap', desc: 'Your doctor prescribed the medication but didn\'t give you a food plan' },
                { icon: <Brain size={28} />, title: 'Fear of regain', desc: 'The thought of the weight coming back is stressful' }
              ].map((item, i) => (
                <div key={i} className="bg-cream rounded-2xl p-6 md:p-8 border border-border/40 hover:border-sage/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage mb-4 group-hover:bg-sage/20">{item.icon}</div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-lg text-forest font-semibold mt-10 italic">There's a better path. Your body already has the tools — you just need to activate them.</p>
          </div>
        </section>

        <section className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="The Science" title="How your body naturally produces GLP-1" subtitle="GLP-1 (Glucagon-Like Peptide-1) is a natural hormone your body produces when you eat certain foods in the right order." />
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
              {[
                { icon: <Clock size={24} />, title: 'Eat-in-Order Protocol', desc: 'Foods eaten in the correct sequence (fiber → protein → fats → carbs) amplify GLP-1 release by up to 45%', feature: 'Meal Moment timer' },
                { icon: <Leaf size={24} />, title: 'GLP-1 Boosting Foods', desc: 'Specific foods like avocado, eggs, berries, and leafy greens contain compounds that stimulate GLP-1 production', feature: 'Food Scanner scores each meal' },
                { icon: <Brain size={24} />, title: 'Timing Matters', desc: 'Eating patterns synchronized with your circadian rhythm optimize hormone response', feature: 'Personalized meal scheduling' }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-border/40 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-forest/5 flex items-center justify-center text-forest mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-forest mb-3">{item.title}</h3>
                  <p className="text-mid text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-sage uppercase tracking-wider"><Check size={12} /><span>App Feature: {item.feature}</span></div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-mid/60 mt-8 italic max-w-2xl mx-auto">Based on peer-reviewed research published in Nature Metabolism, Diabetes Care, and The Journal of Clinical Endocrinology &amp; Metabolism.</p>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="The App" title="Three tools. One goal: sustainable metabolic health." />
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
                  {activeFeature === 1 && (
                    <div className="bg-white rounded-xl p-5 border border-border/40 mb-6">
                      <div className="flex items-center justify-between mb-3"><span className="text-sm font-semibold text-forest">GLP-1 Score</span><span className="text-2xl font-bold text-gold">92</span></div>
                      <div className="h-3 bg-sage-pale rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-sage to-gold rounded-full transition-all duration-1000" style={{ width: '92%' }} /></div>
                      <p className="text-xs text-mid/60 mt-2">Avocado toast score • Excellent GLP-1 response</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-mid italic"><Star size={14} className="text-gold" fill="currentColor" />{features[activeFeature].testimonial}</div>
                </div>
                <div className="w-full md:w-56 h-80 bg-gradient-to-b rounded-2xl flex items-center justify-center border border-border/50 shadow-sm" style={{ background: 'linear-gradient(135deg, #1E3A2B 0%, #4A7C59 100%)' }}>
                  <div className="text-center p-6"><Leaf size={32} className="text-gold mx-auto mb-3 opacity-80" /><p className="text-cream/80 text-sm font-semibold">{features[activeFeature].title}</p><p className="text-cream/40 text-xs mt-1">App preview</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-5xl mx-auto">
            <SectionHeading label="Testimonials" title="Real people. Real results. Naturally." />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[{ number: '15,000+', label: 'Active Users' }, { number: '89%', label: 'Maintain results at 6mo' }, { number: '4.8★', label: 'App Store rating' }, { number: '68%', label: 'Recommend to a friend' }].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 md:p-6 text-center border border-border/40"><p className="text-2xl md:text-3xl font-bold text-forest">{stat.number}</p><p className="text-xs text-mid mt-1">{stat.label}</p></div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-border/40 relative">
                  <div className="absolute top-4 right-4"><span className="text-[10px] font-mono font-bold text-sage uppercase tracking-widest bg-sage/10 px-2 py-1 rounded">{t.type}</span></div>
                  <div className="flex items-center gap-1 text-gold mb-4">{[...Array(5)].map((_, si) => <Star key={si} size={13} fill="currentColor" />)}</div>
                  <p className="text-sm text-mid leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">{t.name.charAt(0)}</div><div><p className="text-sm font-semibold text-forest">{t.name}</p><p className="text-xs text-mid">{t.age}, {t.location}</p></div></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10"><CTAButton variant="primary" href="#signup" onClick={() => trackCta('social_proof')}>Join 15,000+ → <ArrowRight size={18} /></CTAButton></div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeading label="Simple Start" title="From signup to your first GLP-1 Score in under 3 minutes" />
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[{ step: '01', title: 'Tell us about you', desc: 'Quick health profile — age, goals, current medication status' }, { step: '02', title: 'Your first Meal Moment', desc: 'Guided experience: eat a meal using the Eat-in-Order protocol' }, { step: '03', title: 'Get your baseline', desc: 'Your first GLP-1 Score, personalized recommendations, and meal plan' }].map((item, i) => (
                <div key={i} className="text-center relative">
                  {i < 2 && <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />}
                  <div className="w-16 h-16 rounded-full bg-forest text-cream text-xl font-bold flex items-center justify-center mx-auto mb-5 relative z-10">{item.step}</div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-sm text-mid leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12"><CTAButton variant="primary" href="#signup" onClick={() => trackCta('how_it_works')}>Start Your 7-Day Free Trial <ArrowRight size={18} /></CTAButton></div>
          </div>
        </section>

        <section id="pricing" className="py-20 md:py-28 px-4 sm:px-6 bg-cream">
          <div className="max-w-4xl mx-auto">
            <SectionHeading label="Pricing" title="Start free. Upgrade when you're ready." />
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-border/40">
                <h3 className="text-xl font-bold text-forest mb-1">Free</h3>
                <p className="text-3xl font-bold text-forest mb-6">$0 <span className="text-sm font-normal text-mid">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {['3 Meal Moments per week', 'Swap Library access', 'Educational content & recipes', 'Basic GLP-1 Score'].map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-mid"><Check size={16} className="text-sage shrink-0 mt-0.5" /><span>{item}</span></li>))}
                </ul>
                <CTAButton variant="secondary" href="#signup" className="w-full justify-center" onClick={() => trackCta('pricing_free')}>Get Started Free</CTAButton>
              </div>
              <div className="bg-forest rounded-2xl p-8 text-cream relative border-2 border-gold/30 shadow-xl">
                <div className="absolute -top-3 right-6 bg-gold text-forest text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                <h3 className="text-xl font-bold mb-1">Premium</h3>
                <p className="text-3xl font-bold mb-6">$9.99 <span className="text-sm font-normal text-cream/60">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {['Unlimited Meal Moments', 'AI Food Scanner (unlimited)', 'Full AI Meal Builder', 'Personalized meal plans', 'Priority support', 'Grocery list exports'].map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-cream/80"><Check size={16} className="text-gold shrink-0 mt-0.5" /><span>{item}</span></li>))}
                </ul>
                <CTAButton variant="primary" href="#signup" className="w-full justify-center" onClick={() => trackCta('pricing_premium')}>Try Premium Free for 7 Days <ArrowRight size={18} /></CTAButton>
                <p className="text-xs text-cream/40 text-center mt-3">Cancel anytime. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <SectionHeading label="FAQ" title="Your questions, answered." />
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
            <div className="text-center mt-10"><CTAButton variant="ghost" href="#signup" onClick={() => trackCta('faq')}>Start My Journey →</CTAButton></div>
          </div>
        </section>

        <section id="signup" className="py-20 md:py-28 px-4 sm:px-6 bg-forest relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-light/10 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-cream mb-6 leading-tight">Your body was designed to do this.<br /><span className="text-gold">Let us show you how.</span></h2>
            <p className="text-lg text-cream/70 mb-10 max-w-xl mx-auto">15,000+ people have already started their natural GLP-1 journey. Join them today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"><CTAButton variant="primary" href="/" onClick={() => trackCta('final')}>Start Your Free Trial <ArrowRight size={18} /></CTAButton></div>
            <p className="text-sm text-cream/40">No credit card required</p>
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-cream/50">
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Backed by nutritional science</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> Privacy first — your health data stays yours</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-gold" /> US-based customer support</span>
            </div>
          </div>
        </section>

        <footer className="px-6 py-12 border-t border-border/30 text-center bg-cream">
          <a href="/" className="inline-flex items-center gap-2 mb-4"><Leaf size={18} className="text-sage" /><span className="text-base font-bold text-forest tracking-tight">GLP<span className="text-gold">·</span>1 Natural</span></a>
          <p className="text-xs font-mono text-mid/60 uppercase tracking-widest">Built by Risha Smith · GLP·1 Natural · 2026</p>
        </footer>
      </div>
      <ExitIntentPopup />
    </>
  );
}