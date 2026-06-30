'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Achievement } from '@/types';
import AchievementModal from '@/components/AchievementModal';

interface AchievementContextType {
  addAchievements: (achievements: Achievement[]) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [current, setCurrent] = useState<Achievement | null>(null);

  const showNext = useCallback(() => {
    setQueue((prev) => {
      if (prev.length === 0) {
        setCurrent(null);
        return [];
      }
      const [next, ...rest] = prev;
      setCurrent(next);
      return rest;
    });
  }, []);

  const addAchievements = useCallback((achievements: Achievement[]) => {
    if (!achievements || achievements.length === 0) return;
    
    setQueue((prev) => {
      const newQueue = [...prev, ...achievements];
      if (!current && prev.length === 0) {
        // If nothing is showing, start immediately
        const [next, ...rest] = newQueue;
        setCurrent(next);
        return rest;
      }
      return newQueue;
    });
  }, [current]);

  const handleClose = () => {
    setCurrent(null);
    // Short delay before showing next to prevent flash
    setTimeout(showNext, 300);
  };

  return (
    <AchievementContext.Provider value={{ addAchievements }}>
      {children}
      {current && (
        <AchievementModal 
          achievement={current} 
          onClose={handleClose} 
        />
      )}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};
