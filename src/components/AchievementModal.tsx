'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, Sparkles, Trophy } from 'lucide-react';
import { Achievement } from '@/types';

interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClose }) => {
  const isStreak = achievement.criteria_type === 'streak';
  const isLog = achievement.criteria_type === 'total_logs';
  const isScore = achievement.criteria_type === 'best_glp1_score';

  const header = isStreak ? "🏆 Achievement Unlocked!" : isLog ? "🔬 Milestone Reached!" : "⭐ New Personal Best!";
  const cta = isStreak ? "Keep Going" : isLog ? "Scan Another Meal" : "Beat Your Score";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Celebration Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-24 -right-24 w-64 h-64 bg-sage/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative p-8 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-cream hover:bg-border/30 transition-colors"
          >
            <X className="w-4 h-4 text-mid" />
          </button>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full mb-6"
          >
            <Sparkles className="w-3 h-3 text-gold fill-gold" />
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{header}</span>
            <Sparkles className="w-3 h-3 text-gold fill-gold" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            className="w-24 h-24 bg-gradient-to-br from-gold to-gold/60 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-gold/20 mb-6 text-4xl"
          >
            {achievement.icon_url || <Trophy className="w-12 h-12 text-white" />}
          </motion.div>

          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-forest mb-2"
          >
            {achievement.title}
          </motion.h3>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-mid text-sm mb-8 leading-relaxed"
          >
            {achievement.description}
          </motion.p>

          <motion.button
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="w-full bg-forest text-white py-4 rounded-2xl font-bold text-sm hover:bg-forest/90 transition-all shadow-lg shadow-forest/10"
          >
            {cta}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementModal;
