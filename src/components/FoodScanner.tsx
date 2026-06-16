'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, FileText, Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ScanResult } from '@/types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ScanMode = 'label' | 'food' | 'text' | 'camera';

export default function FoodScanner() {
  const [mode, setMode] = useState<ScanMode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);
      const endpoint = mode === 'food' ? '/api/scan-food' : '/api/scan-label';
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64.split(',')[1] }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextScan = async () => {
    if (!textInput.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/scan-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Text scan error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const reset = () => {
    setMode(null);
    setResult(null);
    setTextInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!mode && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 gap-4"
          >
            <ScannerButton 
              icon={<ImageIcon className="w-6 h-6" />}
              title="Label Photo"
              description="Scan ingredients"
              onClick={() => { setMode('label'); setTimeout(() => fileInputRef.current?.click(), 100); }}
            />
            <ScannerButton 
              icon={<Camera className="w-6 h-6" />}
              title="Food Photo"
              description="Analyze a plate"
              onClick={() => { setMode('food'); setTimeout(() => fileInputRef.current?.click(), 100); }}
            />
            <ScannerButton 
              icon={<Sparkles className="w-6 h-6" />}
              title="Live Camera"
              description="Point and scan"
              onClick={() => setMode('camera')}
            />
            <ScannerButton 
              icon={<FileText className="w-6 h-6" />}
              title="Type / Paste"
              description="Ingredient list"
              onClick={() => setMode('text')}
            />
          </motion.div>
        )}

        {mode && !result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl p-8 border border-border shadow-sm relative"
          >
            <button onClick={reset} className="absolute top-4 right-4 p-2 hover:bg-cream rounded-full transition-colors">
              <X className="w-5 h-5 text-mid" />
            </button>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 text-sage animate-spin mb-4" />
                <p className="text-forest font-medium">Analyzing your metabolism...</p>
                <p className="text-mid text-sm">Claude is checking for red flags</p>
              </div>
            ) : (
              <>
                {mode === 'text' ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-forest">Paste Ingredients</h3>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Paste ingredient list here..."
                      className="w-full h-40 bg-cream/50 border border-border rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all resize-none"
                    />
                    <button
                      onClick={handleTextScan}
                      disabled={!textInput.trim()}
                      className="w-full bg-forest text-white py-4 rounded-2xl font-bold hover:bg-forest/90 transition-colors disabled:opacity-50"
                    >
                      Analyze Text
                    </button>
                  </div>
                ) : mode === 'camera' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Camera className="w-16 h-16 text-gold mb-6" />
                    <h3 className="text-xl font-bold text-forest mb-2">Camera Integration</h3>
                    <p className="text-mid text-sm mb-8 max-w-xs">
                      In a production mobile app, this would open a custom scanning viewfinder.
                    </p>
                    <div className="flex gap-4 w-full">
                      <button 
                        onClick={() => { setMode('label'); setTimeout(() => fileInputRef.current?.click(), 100); }}
                        className="flex-1 border border-sage text-sage py-3 rounded-xl text-sm font-bold"
                      >
                        It's a Label
                      </button>
                      <button 
                        onClick={() => { setMode('food'); setTimeout(() => fileInputRef.current?.click(), 100); }}
                        className="flex-1 border border-sage text-sage py-3 rounded-xl text-sm font-bold"
                      >
                        It's Real Food
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-sage/30 rounded-2xl bg-sage-pale/30">
                    <Upload className="w-10 h-10 text-sage mb-4" />
                    <p className="text-forest font-medium">Ready to upload</p>
                    <p className="text-mid text-xs">Waiting for your photo...</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden"
          >
            {/* Header Result */}
            <div className={cn(
              "p-8 text-white",
              result.verdict === 'GREEN' ? "bg-sage" : 
              result.verdict === 'YELLOW' ? "bg-gold" : "bg-red-soft"
            )}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-mono tracking-widest uppercase opacity-80 mb-1">Metabolic Verdict</div>
                  <h2 className="text-3xl font-bold">{result.title}</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center min-w-[80px]">
                  <div className="text-[10px] font-mono uppercase opacity-80">Score</div>
                  <div className="text-2xl font-bold">{result.score}</div>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">{result.subtitle}</p>
            </div>

            <div className="p-8 space-y-8">
              {/* Ingredients */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-mid uppercase mb-4">Ingredient Breakdown</h4>
                <div className="space-y-3">
                  {result.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-start gap-3 bg-cream/50 p-4 rounded-xl border border-border/50">
                      <span className="text-xl">{ing.status}</span>
                      <div>
                        <div className="font-bold text-forest text-sm">{ing.name}</div>
                        <div className="text-xs text-mid">{ing.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swaps */}
              {result.swaps.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gold uppercase mb-4">Recommended Swaps</h4>
                  <div className="space-y-4">
                    {result.swaps.map((swap, i) => (
                      <div key={i} className="bg-sage-pale/50 p-5 rounded-2xl border border-sage/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                        <div className="flex items-center gap-2 text-mid text-xs mb-2 italic">
                          <span>Instead of {swap.avoid}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                        <div className="font-bold text-forest mb-1">Upgrade to {swap.upgrade}</div>
                        <p className="text-xs text-mid leading-relaxed">{swap.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advice */}
              <div className="bg-forest text-white p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="font-bold text-sm">Metabolic Pro-Tip</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">{result.recommendation}</p>
              </div>

              <button 
                onClick={reset}
                className="w-full py-4 text-sage font-bold text-sm hover:bg-sage-pale transition-colors rounded-xl"
              >
                Scan Another Item
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}

function ScannerButton({ icon, title, description, onClick }: { icon: any, title: string, description: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:border-sage hover:shadow-md transition-all text-left group"
    >
      <div className="w-12 h-12 bg-sage-pale rounded-2xl flex items-center justify-center text-sage mb-4 group-hover:bg-sage group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-forest mb-1">{title}</h3>
      <p className="text-xs text-mid leading-relaxed">{description}</p>
    </button>
  );
}
