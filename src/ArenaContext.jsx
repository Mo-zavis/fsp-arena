import { createContext, useContext, useState, useCallback } from 'react';
import { arenas as baseArenas, adminArenas as baseAdminArenas } from './data/mockData';

const ArenaContext = createContext();

const AI_ARENA = {
  // Player-facing shape
  player: {
    id: 'fsp-ai-gen',
    name: 'Champions League',
    title: 'Champions League Arena',
    description: 'An elite multi-sport competition featuring the best athletes worldwide. Compete across Basketball and Soccer for massive prizes and global recognition.',
    sport: 'Basketball',
    coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    hostName: 'FSP Official',
    hostInitial: 'F',
    joined: '0',
    joinedNum: 0,
    daysLeft: 90,
    sportCount: 2,
    entryFee: 499,
    spBurn: 6000,
    subsidy: 50,
    trending: false,
    badge: 'AI Created',
    reward: {
      title: 'VIP Championship Experience + $25,000 Cash',
      description: 'Top 20 performers win. 8 Golden Ticket wild card slots.',
      performanceSlots: 20,
      goldenTicketSlots: 8,
    },
    divisions: {
      premierCap: 100,
      challengerOpen: true,
      tiers: { gold: 50, silver: 30, bronze: 20 },
    },
    splits: { host: 55, captainPool: 20, platform: 25 },
    seasonStart: '2026-07-01',
    seasonEnd: '2026-10-31',
  },
  // Admin-facing shape
  admin: {
    id: 'fsp-ai-gen',
    name: 'Champions League Arena',
    sport: 'Basketball',
    status: 'active',
    season: 1,
    seasonStart: '2026-07-01',
    seasonEnd: '2026-10-31',
    daysLeft: 90,
    totalParticipants: 0,
    totalCaptains: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    hostShare: 0,
    captainPool: 0,
    platformFee: 0,
    entryFee: 499,
    premierCap: 100,
    premierFilled: 0,
    challengerCount: 0,
    splits: { host: 55, captainPool: 20, platform: 25 },
    tiers: { gold: 50, silver: 30, bronze: 20 },
    coverGradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
  },
};

export function ArenaProvider({ children }) {
  const [extraArenas, setExtraArenas] = useState([]);
  const [extraAdminArenas, setExtraAdminArenas] = useState([]);

  const allArenas = [...baseArenas, ...extraArenas];
  const allAdminArenas = [...baseAdminArenas, ...extraAdminArenas];

  const addAiArena = useCallback(() => {
    setExtraArenas(prev => {
      if (prev.some(a => a.id === AI_ARENA.player.id)) return prev;
      return [...prev, AI_ARENA.player];
    });
    setExtraAdminArenas(prev => {
      if (prev.some(a => a.id === AI_ARENA.admin.id)) return prev;
      return [...prev, AI_ARENA.admin];
    });
  }, []);

  return (
    <ArenaContext.Provider value={{ arenas: allArenas, adminArenas: allAdminArenas, addAiArena, aiArena: AI_ARENA }}>
      {children}
    </ArenaContext.Provider>
  );
}

export function useArenas() {
  return useContext(ArenaContext);
}
