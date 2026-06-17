'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Sparkles, ChevronRight, Check, Plus, Trash2 } from 'lucide-react';
import AmazonButton from './AmazonButton';
import { generateGroceryCartLink } from '@/lib/amazon';

interface FoodItem {
  id: string;
  name: string;
  category: 'fiber' | 'protein' | 'starch' | 'pre-probiotic';
  score: number; // 0-100
}

const FOOD_LIBRARY: FoodItem[] = [
  // Fiber
  { id: 'f1', name: 'Chia Seeds', category: 'fiber', score: 100 },
  { id: 'f2', name: 'Spinach', category: 'fiber', score: 95 },
  { id: 'f3', name: 'Broccoli', category: 'fiber', score: 95 },
  { id: 'f4', name: 'Avocado', category: 'fiber', score: 90 },
  { id: 'f5', name: 'Flaxseeds', category: 'fiber', score: 100 },
  // Protein
  { id: 'p1', name: 'Wild Salmon', category: 'protein', score: 95 },
  { id: 'p2', name: 'Grass-fed Beef', category: 'protein', score: 85 },
  { id: 'p3', name: 'Boiled Eggs', category: 'protein', score: 90 },
  { id: 'p4', name: 'Tempeh', category: 'protein', score: 90 },
  { id: 'p5', name: 'Chicken Breast', category: 'protein', score: 80 },
  // Starch
  { id: 's1', name: 'Sweet Potato', category: 'starch', score: 85 },
  { id: 's2', name: 'Quinoa', category: 'starch', score: 80 },
  { id: 's3', name: 'White Rice', category: 'starch', score: 40 },
  { id: 's4', name: 'Pasta', category: 'starch', score: 30 },
  { id: 's5', name: 'Brown Rice', category: 'starch', score: 70 },
  // Pre/Probiotic
  { id: 'pp1', name: 'Kimchi', category: 'pre-probiotic', score: 100 },
  { id: 'pp2', name: 'Greek Yogurt', category: 'pre-probiotic', score: 90 },
  { id: 'pp3', name: 'Sauerkraut', category: 'pre-probiotic', score: 100 },
  { id: 'pp4', name: 'Kefir', category: 'pre-probiotic', score: 95 },
];

type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export default function MealBuilder() {
  const [activeTab, setActiveTab] = useState<MealType>('Breakfast');
  const [selections, setSelections] = useState<Record<MealType, string[]>>({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snack: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPlan, setAiPlan] = useState<string | null>(null);

  const toggleFood = (meal: MealType, foodId: string) => {
    setSelections(prev => {
      const current = prev[meal];
      if (current.includes(foodId)) {
        return { ...prev, [meal]: current.filter(id => id !== foodId) };
      }
      return { ...prev, [meal]: [...current, foodId] };
    });
  };

  const selectedFoodNames = useMemo(() => {
    const allSelectedIds = Object.values(selections).flat();
    return allSelectedIds.map(id => FOOD_LIBRARY.find(f => f.id === id)?.name).filter(Boolean) as string[];
  }, [selections]);

  const currentScore = useMemo(() => {
    const allSelectedIds = Object.values(selections).flat();
    if (allSelectedIds.length === 0) return 100;
    
    const total = allSelectedIds.reduce((acc, id) => {
      const item = FOOD_LIBRARY.find(f => f.id === id);
      return acc + (item?.score || 0);
    }, 0);
    
    return Math.round(total / allSelectedIds.length);
  }, [selections]);

  const generatePlan = async () => {
    const allSelectedIds = Object.values(selections).flat();
    if (allSelectedIds.length === 0) return;
    
    setIsGenerating(true);
    setAiPlan(null);
    
    const selectedFoods = allSelectedIds.map(id => FOOD_LIBRARY.find(f => f.id === id)!);
    
    try {
      const res = await fetch('/api/meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fiber: selectedFoods.filter(f => f.category === 'fiber').map(f => f.name),
          protein: selectedFoods.filter(f => f.category === 'protein').map(f => f.name),
          prebiotic: selectedFoods.filter(f => f.category === 'pre-probiotic').map(f => f.name),
          probiotic: selectedFoods.filter(f => f.category === 'pre-probiotic').map(f => f.name), // simplified
        }),
      });
      const data = await res.json();
      setAiPlan(data.plan);
    } catch (err) {
      console.error('Plan generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-sage';
    if (score >= 60) return 'text-gold';
    return 'text-red-soft';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-sage/10';
    if (score >= 60) return 'bg-gold/10';
    return 'bg-red-soft/10';
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar / Stats */}
        <div className="w-full md:w-64 bg-cream/30 p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
          <div className="mb-6 md:mb-8 flex md:block justify-between items-end">
            <div>
              <h3 className="text-[10px] font-mono tracking-widest text-gold uppercase mb-2">Daily Score</h3>
              <div className={cn("text-4xl md:text-5xl font-bold mb-2 transition-colors", getScoreColor(currentScore))}>
                {currentScore}
              </div>
            </div>
            <div className={cn("px-3 py-1 rounded-full inline-block text-[10px] font-bold uppercase tracking-wider mb-2 md:mb-0", getScoreBg(currentScore), getScoreColor(currentScore))}>
              {currentScore >= 85 ? 'Optimal' : currentScore >= 60 ? 'Fair' : 'Blocker Heavy'}
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={generatePlan}
              disabled={isGenerating || Object.values(selections).flat().length === 0}
              className="w-full bg-forest text-white py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-forest/90 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              AI Meal Plan
            </button>
            <a
              href={generateGroceryCartLink(selectedFoodNames)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-full bg-gold text-white py-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gold/90 transition-all shadow-sm",
                selectedFoodNames.length === 0 && "opacity-50 pointer-events-none"
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              Shop Ingredients
            </a>
            <p className="text-[10px] text-mid text-center italic">
              Claude will sequence your picks for maximum GLP-1 impact.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-cream/50 p-1.5 rounded-2xl w-full overflow-x-auto custom-scrollbar md:w-fit">
            {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as MealType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                  activeTab === tab ? "bg-white text-forest shadow-sm" : "text-mid hover:text-forest"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="space-y-8">
            {(['fiber', 'protein', 'starch', 'pre-probiotic'] as const).map(cat => (
              <div key={cat}>
                <h4 className="text-[10px] font-mono tracking-widest text-gold uppercase mb-4 flex justify-between items-center">
                  <span>{cat.replace('-', '/')}</span>
                  {cat === 'fiber' && <span className="text-sage font-bold">Eat First</span>}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {FOOD_LIBRARY.filter(f => f.category === cat).map(food => {
                    const isSelected = selections[activeTab].includes(food.id);
                    return (
                      <div key={food.id} className="relative group">
                        <button
                          onClick={() => toggleFood(activeTab, food.id)}
                          className={cn(
                            "px-4 py-3 rounded-2xl text-xs font-medium transition-all flex items-center gap-2 border",
                            isSelected 
                              ? "bg-sage border-sage text-white shadow-md shadow-sage/20" 
                              : "bg-white border-border text-charcoal hover:border-sage/50"
                          )}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-mid" />}
                          {food.name}
                        </button>
                        
                        {/* Amazon Quick Link */}
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a 
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(food.name)}&tag=glp1natural-20`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform block"
                            title={`Buy ${food.name} on Amazon`}
                          >
                            <ShoppingCart className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Plan Modal/Overlay */}
      <AnimatePresence>
        {aiPlan && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 border-t border-border bg-sage-pale/30"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-forest mb-1">Your Metabolic Roadmap</h3>
                <p className="text-xs text-mid">Personalized sequencing for your selected foods.</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={generateGroceryCartLink(selectedFoodNames)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-gold/90 transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Shop Plan
                </a>
                <button 
                  onClick={() => setAiPlan(null)}
                  className="text-mid hover:text-forest p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="prose prose-sm max-w-none prose-p:text-mid prose-headings:text-forest prose-strong:text-forest whitespace-pre-wrap bg-white p-6 rounded-2xl border border-sage/10">
              {aiPlan}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
