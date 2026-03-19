export const arenas = [
  {
    id: 'nelk',
    name: 'NELK Boys',
    title: 'NELK Boys Arena',
    description: 'The ultimate beer pong experience. Compete against the best for massive prizes.',
    sport: 'Beer Pong',
    coverGradient: 'linear-gradient(135deg, #0000FF 0%, #1a1aff 100%)',
    hostName: 'NELK Boys',
    hostInitial: 'N',
    joined: '2,400',
    joinedNum: 2400,
    daysLeft: 45,
    sportCount: 1,
    entryFee: 399,
    spBurn: 5000,
    subsidy: 50,
    trending: true,
    badge: 'Trending',
    reward: {
      title: 'Trip to Cancun + $10,000 Cash Prize',
      description: 'Top 15 performers win. 5 Golden Ticket wild card slots.',
      performanceSlots: 15,
      goldenTicketSlots: 5,
    },
    divisions: {
      premierCap: 75,
      challengerOpen: true,
      tiers: { gold: 50, silver: 30, bronze: 20 },
    },
    splits: { host: 60, captainPool: 15, platform: 25 },
    seasonStart: '2026-06-01',
    seasonEnd: '2026-08-30',
  },
  {
    id: 'wps',
    name: 'World Premier Squash',
    title: 'World Premier Squash Arena',
    description: 'Elite squash competition with world-class rewards and global leaderboards.',
    sport: 'Squash',
    coverGradient: 'linear-gradient(135deg, #1a5c3b, #10B981)',
    hostName: 'WPS Official',
    hostInitial: 'W',
    joined: '1,800',
    joinedNum: 1800,
    daysLeft: 60,
    sportCount: 1,
    entryFee: 399,
    spBurn: 5000,
    subsidy: 50,
    trending: false,
    badge: 'New',
    reward: {
      title: 'VIP Dubai Experience + $15,000',
      description: 'Top 10 performers win. 3 Golden Ticket wild card slots.',
      performanceSlots: 10,
      goldenTicketSlots: 3,
    },
    divisions: {
      premierCap: 75,
      challengerOpen: true,
      tiers: { gold: 50, silver: 30, bronze: 20 },
    },
    splits: { host: 55, captainPool: 15, platform: 30 },
    seasonStart: '2026-05-15',
    seasonEnd: '2026-09-15',
  },
  {
    id: 'wbl',
    name: 'World Bowling League',
    title: 'World Bowling League Arena',
    description: 'Strike your way to the top. The biggest bowling competition on the planet.',
    sport: 'Bowling',
    coverGradient: 'linear-gradient(135deg, #5c4a1a, #F59E0B)',
    hostName: 'WBL',
    hostInitial: 'B',
    joined: '1,200',
    joinedNum: 1200,
    daysLeft: 30,
    sportCount: 1,
    entryFee: 399,
    spBurn: 5000,
    subsidy: 50,
    trending: false,
    badge: null,
    reward: {
      title: 'Las Vegas Championship + $8,000',
      description: 'Top 12 performers win. 4 Golden Ticket wild card slots.',
      performanceSlots: 12,
      goldenTicketSlots: 4,
    },
    divisions: {
      premierCap: 75,
      challengerOpen: true,
      tiers: { gold: 50, silver: 30, bronze: 20 },
    },
    splits: { host: 60, captainPool: 15, platform: 25 },
    seasonStart: '2026-06-01',
    seasonEnd: '2026-07-31',
  },
]

export const captainLeaderboard = [
  { rank: 1, handle: '@beer_king', squad: 'King Pong', ncs: 6120, tier: 'Gold', division: 'Premier' },
  { rank: 2, handle: '@pong_master', squad: 'Pong Stars', ncs: 5440, tier: 'Gold', division: 'Premier' },
  { rank: 3, handle: '@mookie_butts', squad: 'Team Mook', ncs: 4820, tier: 'Gold', division: 'Premier', isYou: true },
  { rank: 4, handle: '@cup_hero', squad: 'Cup Squad', ncs: 4210, tier: 'Gold', division: 'Premier' },
  { rank: 5, handle: '@tosser', squad: 'The Toss', ncs: 3890, tier: 'Gold', division: 'Premier' },
  { rank: 6, handle: '@ponger', squad: 'Pong Life', ncs: 3650, tier: 'Gold', division: 'Premier' },
  { rank: 7, handle: '@brewer', squad: 'Brew Crew', ncs: 3410, tier: 'Gold', division: 'Premier' },
  { rank: 8, handle: '@aim_true', squad: 'Aim Team', ncs: 3200, tier: 'Gold', division: 'Premier' },
  { rank: 9, handle: '@splash_1', squad: 'Splash Bros', ncs: 3050, tier: 'Gold', division: 'Premier' },
  { rank: 10, handle: '@top_cup', squad: 'Top Cups', ncs: 2900, tier: 'Gold', division: 'Premier' },
  { rank: 11, handle: '@rookie_1', squad: 'New Kids', ncs: 2100, tier: 'Silver', division: 'Premier' },
  { rank: 12, handle: '@rising_star', squad: 'Rising', ncs: 1980, tier: 'Silver', division: 'Premier' },
  { rank: 13, handle: '@fresh_arm', squad: 'Fresh Arms', ncs: 1750, tier: 'Silver', division: 'Premier' },
]

export const squadMembers = [
  { handle: '@player_1', depth: 1, sessions: 8, active: true },
  { handle: '@player_2', depth: 1, sessions: 12, active: true },
  { handle: '@player_3', depth: 1, sessions: 10, active: true },
  { handle: '@player_4', depth: 2, sessions: 5, active: true },
  { handle: '@player_5', depth: 2, sessions: 3, active: false },
  { handle: '@player_6', depth: 2, sessions: 7, active: true },
  { handle: '@player_7', depth: 2, sessions: 6, active: true },
  { handle: '@player_8', depth: 3, sessions: 4, active: true },
  { handle: '@player_9', depth: 3, sessions: 2, active: false },
  { handle: '@player_10', depth: 3, sessions: 5, active: true },
]

export const payoutHistory = [
  { month: 'Mar 2026', amount: 4280, tier: 'Premier Gold', status: 'Paid' },
  { month: 'Feb 2026', amount: 4120, tier: 'Premier Gold', status: 'Paid' },
  { month: 'Jan 2026', amount: 4440, tier: 'Premier Silver', status: 'Paid' },
]

export const tierHistory = [
  { month: 'Mar', from: 'P:Gold', to: 'P:Gold', direction: 'hold', label: 'Held' },
  { month: 'Feb', from: 'P:Silver', to: 'P:Gold', direction: 'up', label: 'Promoted' },
  { month: 'Jan', from: '--', to: 'P:Silver', direction: 'new', label: 'New' },
]

export const referralTree = [
  { depth: 1, paid: 12, avgSessions: 8.2 },
  { depth: 2, paid: 24, avgSessions: 6.1 },
  { depth: 3, paid: 12, avgSessions: 4.8 },
]

export const opsReviews = [
  {
    id: 'nelk',
    name: 'NELK Boys Arena',
    submitted: 'Mar 19, 2026',
    host: '@nelkboys',
    sport: 'Beer Pong',
    entryFee: 399,
    splits: '60 / 15 / 25',
  },
  {
    id: 'wps',
    name: 'World Premier Squash',
    submitted: 'Mar 18, 2026',
    host: '@wps_official',
    sport: 'Squash',
    entryFee: 399,
    splits: '55 / 15 / 30',
  },
]

export const availableSports = [
  'Beer Pong', 'Squash', 'Bowling', 'Soccer', 'Basketball', 'Tennis', 'Swimming', 'Golf'
]
