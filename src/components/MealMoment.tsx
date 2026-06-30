'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, AlertCircle, CheckCircle2, HelpCircle, ShoppingCart } from 'lucide-react';
import AmazonButton from './AmazonButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAchievements } from '@/lib/achievement-context';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Verdict = 'GREEN' | 'YELLOW' | 'RED';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  verdict?: Verdict;
  buyIngredients?: string[];
}

const EXAMPLES = [
  "I just ate boiled eggs with raw olive oil and salt",
  "Is Chick-fil-A okay?",
  "My coworker brought donuts"
];

export default function MealMoment() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addAchievements } = useAchievements();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    e?.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/meal-moment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          userMessage: text
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.text,
        verdict: data.verdict,
        buyIngredients: data.buyIngredients || []
      };
      setMessages(prev => [...prev, assistantMsg]);
      if (data.newAchievements) {
        addAchievements(data.newAchievements);
      }
    } catch (error) {
      console.error('Meal Moment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-border overflow-hidden">
      <div className="p-5 md:p-6 pb-4">
        <h3 className="text-[10px] md:text-xs font-mono tracking-widest text-gold uppercase mb-4">
          Quick Check — Is this ok?
        </h3>
        
        <div 
          ref={scrollRef}
          className="space-y-4 mb-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
        >
          {messages.length === 0 && (
            <p className="text-mid text-sm italic">
              Describe what you just ate or saw... e.g. 'boiled eggs with olive oil'
            </p>
          )}
          
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-3 rounded-2xl max-w-[90%] md:max-w-[85%] text-sm",
                  msg.role === 'user' 
                    ? "bg-forest text-white rounded-tr-none" 
                    : "bg-sage-pale text-charcoal rounded-tl-none border border-sage/10"
                )}>
                  {msg.role === 'assistant' && msg.verdict && (
                    <div className="flex items-center gap-2 mb-2 font-bold text-[10px] md:text-xs">
                      {msg.verdict === 'GREEN' && <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-sage" />}
                      {msg.verdict === 'YELLOW' && <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold" />}
                      {msg.verdict === 'RED' && <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-soft" />}
                      <span className={cn(
                        msg.verdict === 'GREEN' && "text-sage",
                        msg.verdict === 'YELLOW' && "text-gold",
                        msg.verdict === 'RED' && "text-red-soft"
                      )}>
                        GLP-1 {msg.verdict === 'GREEN' ? 'APPROVED' : msg.verdict === 'YELLOW' ? 'AWARENESS' : 'BLOCKER'}
                      </span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed text-xs md:text-sm">{msg.content}</p>
                  
                  {msg.role === 'assistant' && msg.buyIngredients && msg.buyIngredients.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-sage/10 flex flex-wrap gap-2">
                      {msg.buyIngredients.map((ing, j) => (
                        <AmazonButton key={j} ingredient={ing} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-sage-pale px-4 py-3 rounded-2xl rounded-tl-none border border-sage/10 animate-pulse">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-sage/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-sage/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-sage/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
            className="w-full bg-cream/50 border border-border rounded-2xl py-3 md:py-4 pl-4 md:pl-5 pr-12 md:pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-forest text-white p-2 md:p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest/90 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="bg-sage-pale/50 px-5 md:px-6 py-3 md:py-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => handleSubmit(undefined, ex)}
            className="bg-white border border-border hover:border-sage text-[9px] md:text-[11px] text-mid hover:text-sage px-2.5 py-1 md:px-3 md:py-1.5 rounded-full transition-all"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
