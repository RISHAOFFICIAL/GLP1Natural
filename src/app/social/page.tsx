'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  UserPlus, 
  UserMinus, 
  ArrowLeft, 
  Loader2, 
  Trophy, 
  Flame, 
  Zap, 
  Award,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '@/types';
import PricingModal from '@/components/PricingModal';
import ActivityFeed from './ActivityFeed';

export default function SocialPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [following, setFollowing] = useState<UserProfile[]>([]);
  const [followers, setFollowers] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'following' | 'followers' | 'search'>('following');
  const [loading, setLoading] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchSocialLists();
  }, []);

  const fetchSocialLists = async () => {
    setLoading(true);
    try {
      const [followingRes, followersRes] = await Promise.all([
        fetch('/api/user/social?type=following'),
        fetch('/api/user/social?type=followers')
      ]);

      if (followingRes.ok) setFollowing(await followingRes.json());
      if (followersRes.ok) setFollowers(await followersRes.json());
    } catch (error) {
      console.error('Error fetching social lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setActiveTab('search');
    try {
      const res = await fetch(`/api/user/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        setSearchResults(await res.json());
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFollow = async (userId: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        const res = await fetch(`/api/user/social?following_id=${userId}`, { method: 'DELETE' });
        if (res.ok) {
          setFollowing(prev => prev.filter(u => u.id !== userId));
        }
      } else {
        const res = await fetch('/api/user/social', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ following_id: userId })
        });
        if (res.ok) {
          // Refresh list or add to state
          fetchSocialLists();
        }
      }
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const isUserFollowing = (userId: string) => following.some(u => u.id === userId);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 md:px-6 py-4 flex justify-between items-center border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-forest hover:text-gold transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-forest tracking-tight">
            Metabolic <span className="text-gold">Social</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPricingOpen(true)}
            className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-full transition-all group"
          >
            <Star className="w-4 h-4 fill-gold group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Premium</span>
          </button>
        </div>
      </header>

      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8 relative">
          <input
            type="text"
            placeholder="Search for metabolic friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream/30 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-forest placeholder:text-mid focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mid w-5 h-5" />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-forest text-white px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-forest/90 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Activity Feed */}
        <ActivityFeed />

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-cream/20 p-1 rounded-2xl border border-border/30">
          {[
            { id: 'following', label: 'Following', count: following.length, icon: Users },
            { id: 'followers', label: 'Followers', count: followers.length, icon: Users },
            { id: 'search', label: 'Search Results', count: searchResults.length, icon: Search, hidden: activeTab !== 'search' }
          ].map(tab => !tab.hidden && (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-forest shadow-sm' 
                  : 'text-mid hover:text-forest'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-gold' : ''}`} />
              {tab.label}
              <span className="bg-sage/10 text-sage px-2 py-0.5 rounded-full text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
              <p className="text-mid font-medium italic">Scanning the metabolic network...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid gap-4"
              >
                {activeTab === 'following' && following.length === 0 && (
                  <div className="text-center py-20 bg-cream/10 rounded-[2rem] border border-dashed border-border/50">
                    <Users className="w-12 h-12 text-mid/30 mx-auto mb-4" />
                    <p className="text-mid font-medium">You aren't following anyone yet.<br/>Find friends to track metabolic progress together!</p>
                  </div>
                )}
                
                {activeTab === 'followers' && followers.length === 0 && (
                  <div className="text-center py-20 bg-cream/10 rounded-[2rem] border border-dashed border-border/50">
                    <Users className="w-12 h-12 text-mid/30 mx-auto mb-4" />
                    <p className="text-mid font-medium">No followers yet. Keep logging and<br/>sharing your GLP-1 journey!</p>
                  </div>
                )}

                {(activeTab === 'following' ? following : activeTab === 'followers' ? followers : searchResults).map((user) => (
                  <div 
                    key={user.id}
                    className="bg-white border border-border/30 rounded-3xl p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-forest/5 flex items-center justify-center border-2 border-sage/20 overflow-hidden">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.username || ''} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-bold text-forest uppercase">
                            {(user.username || user.full_name || '?')[0]}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-forest">@{user.username || 'anonymous'}</h3>
                        <p className="text-xs text-mid line-clamp-1">{user.bio || 'Metabolic explorer'}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                            <span className="text-[10px] font-bold text-forest">{user.current_streak}d</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(user.id, isUserFollowing(user.id));
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        isUserFollowing(user.id)
                          ? 'bg-cream text-mid hover:bg-red-50 hover:text-red-500'
                          : 'bg-forest text-white hover:bg-forest/90'
                      }`}
                    >
                      {isUserFollowing(user.id) ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="h-24 bg-gradient-to-r from-forest to-sage"></div>
              <div className="px-8 pb-8">
                <div className="relative -mt-12 mb-4 flex justify-between items-end">
                  <div className="w-24 h-24 rounded-[2rem] bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-[1.8rem] bg-cream flex items-center justify-center border border-border/50 overflow-hidden text-2xl font-bold text-forest uppercase">
                      {selectedUser.avatar_url ? (
                        <img src={selectedUser.avatar_url} alt={selectedUser.username || ''} className="w-full h-full object-cover" />
                      ) : (
                        (selectedUser.username || selectedUser.full_name || '?')[0]
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="mb-1 p-2 rounded-full bg-cream hover:bg-border/30 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-forest rotate-90" />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-forest">@{selectedUser.username}</h2>
                <p className="text-sm text-mid mb-6">{selectedUser.bio || 'Metabolic health explorer focused on natural GLP-1 optimization.'}</p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { label: 'Streak', value: `${selectedUser.current_streak}d`, icon: Flame, color: 'text-red-500' },
                    { label: 'Logs', value: selectedUser.total_logs || 0, icon: Trophy, color: 'text-gold' },
                    { label: 'Best', value: selectedUser.best_glp1_score || 0, icon: Zap, color: 'text-gold' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-cream/30 border border-border/20 p-3 rounded-2xl text-center">
                      <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                      <div className="text-lg font-bold text-forest">{stat.value}</div>
                      <div className="text-[9px] font-bold text-mid uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-sage uppercase tracking-[0.2em] flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold" />
                    Top Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {/* Placeholder for badges since I don't have them in search results yet */}
                    {['First Step', 'Building Momentum', 'Fiber First'].map((badge, i) => (
                      <div key={i} className="bg-cream/50 border border-border/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-forest">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    toggleFollow(selectedUser.id, isUserFollowing(selectedUser.id));
                    setSelectedUser(null);
                  }}
                  className={`w-full mt-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                    isUserFollowing(selectedUser.id)
                      ? 'bg-cream text-mid hover:bg-red-50 hover:text-red-500 shadow-cream/50'
                      : 'bg-forest text-white hover:bg-forest/90 shadow-forest/10'
                  }`}
                >
                  {isUserFollowing(selectedUser.id) ? 'Unfollow' : 'Follow User'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
