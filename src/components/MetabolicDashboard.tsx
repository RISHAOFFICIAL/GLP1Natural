'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Zap, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Activity,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { UserProfile, UserAchievement } from '@/types';

const MetabolicDashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, achRes] = await Promise.all([
          fetch('/api/user/profile'),
          fetch('/api/user/achievements')
        ]);
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
        
        if (achRes.ok) {
          const achData = await achRes.json();
          setAchievements(achData.earned || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-border/50 rounded-3xl p-6 flex justify-center items-center shadow-sm">
        <Loader2 className="w-6 h-6 text-gold animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Total Logs', value: profile?.total_logs || 0, icon: <Activity className="w-5 h-5 text-gold" /> },
    { label: 'Current Streak', value: `${profile?.current_streak || 0}d`, icon: <Flame className="w-5 h-5 text-red-500" /> },
    { label: 'Best Streak', value: `${profile?.best_streak || 0}d`, icon: <Award className="w-5 h-5 text-gold" /> },
    { label: 'Best Score', value: profile?.best_glp1_score || 0, icon: <Zap className="w-5 h-5 text-gold" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white border border-border/50 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Header / Summary */}
      <div 
        className="px-6 py-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-cream/10 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center shadow-inner">
            <Trophy className="text-gold w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-forest text-lg tracking-tight">Metabolic Intelligence</h3>
            <p className="text-sm text-mid font-medium">Level up your natural GLP-1 production.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 ml-auto sm:ml-0">
          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <Flame className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="font-bold text-red-700 text-sm">{profile?.current_streak || 0} day streak</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-border/20 flex items-center justify-center text-forest hover:bg-border/40 transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border/30 bg-cream/5 overflow-hidden"
          >
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white border border-border/30 p-4 rounded-2xl shadow-sm"
                  >
                    <div className="mb-2 bg-cream/30 w-fit p-1.5 rounded-lg">{stat.icon}</div>
                    <div className="text-2xl font-bold text-forest">{stat.value}</div>
                    <div className="text-[10px] text-mid font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Achievements Section */}
              <div className="bg-white border border-border/30 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[11px] font-bold text-gold uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Earned Achievements
                </h4>
                
                {achievements.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {achievements.map((ach, i) => (
                      <motion.div 
                        key={ach.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-center gap-4 bg-cream/10 border border-border/20 p-3.5 rounded-xl hover:border-gold/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 border border-gold/20 shadow-sm">
                          <Award className="text-gold w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-forest text-sm leading-tight">{ach.title}</div>
                          <div className="text-[11px] text-mid leading-snug mt-0.5">{ach.description}</div>
                        </div>
                        <div className="bg-forest/10 p-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 border-2 border-dashed border-border/30 rounded-xl bg-cream/5">
                    <div className="w-12 h-12 bg-border/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-mid opacity-40" />
                    </div>
                    <p className="text-sm text-mid font-medium">No achievements earned yet.<br/>Log your first meal to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetabolicDashboard;
