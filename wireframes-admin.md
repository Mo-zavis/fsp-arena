# FSP Arena Admin Panel -- Flows & Screens

## Overview

The admin panel is the creator/host dashboard where arena managers (celebrities, influencers like NELK Boys) create, launch, and manage their arenas. It includes affiliate management for tracking collaborator performance.

**Live:** https://fsp-arena.vercel.app/admin
**GitHub:** https://github.com/Mo-zavis/fsp-arena

---

## Information Architecture

```
/admin                          Dashboard (home)
/admin/arenas                   My Arenas (same as dashboard)
/admin/arenas/:id               Arena Manager (5 tabs)
/admin/arenas/:id/referrals     Affiliate Manager
/admin/create                   Create Arena (6-step wizard)
/admin/ops                      Ops Review
```

---

## Flow 1: ADMIN DASHBOARD (`/admin`)

Purpose: Overview of all managed arenas and key business metrics.

```
+------------------+--------------------------------------------+
|                  |                                            |
|  FSP. ADMIN      |  DASHBOARD                [+ Create Arena] |
|                  |  Welcome back, NELK Boys                   |
|  [Dashboard]  *  |                                            |
|  [My Arenas]     |  +--------+  +--------+  +--------+  +---+|
|  [Create Arena]  |  | 5,400  |  | 192    |  | $2.15M |  | 2 ||
|  [Captains]      |  | Players|  | Captns |  | Revenue|  |Act||
|  [Revenue]       |  +--------+  +--------+  +--------+  +---+|
|  [Affiliates]    |                                            |
|                  |  MY ARENAS                                 |
|  ----------      |                                            |
|  [Ops Review]    |  +----------------------------------------+|
|                  |  | [gradient] NELK Boys Arena    ACTIVE   ||
|  ----------      |  | Beer Pong                              ||
|  (N) @nelkboys   |  | 2,400 players | 85 captains | 45d     ||
|  NELK Boys       |  | Revenue: $957,600                     ||
|  [Back to App]   |  |                          [Manage ->]   ||
|                  |  +----------------------------------------+|
+------------------+                                            |
                   |  +----------------------------------------+|
                   |  | [gradient] World Premier Squash ACTIVE ||
                   |  | Squash                                 ||
                   |  | 1,800 players | 62 captains | 60d      ||
                   |  | Revenue: $718,200                      ||
                   |  |                          [Manage ->]   ||
                   |  +----------------------------------------+|
                   |                                            |
                   |  +----------------------------------------+|
                   |  | [gradient] World Bowling    IN REVIEW  ||
                   |  | Bowling                                ||
                   |  | 1,200 players | 45 captains | 30d      ||
                   |  | Revenue: $478,800                      ||
                   |  |                          [Manage ->]   ||
                   |  +----------------------------------------+|
                   |                                            |
                   |  QUICK ACTIONS                             |
                   |  [Create New Arena] [View Payouts] [Season]|
                   +--------------------------------------------+
```

**Key elements:**
- Dark navy sidebar (240px, fixed) with nav links + user info
- 4 KPI cards: Total Players, Captains, Revenue (blue), Active Arenas
- Arena cards: gradient strip left, name, sport, status badge (green/yellow), stats, "Manage" link
- Quick action cards at bottom
- Mobile: sidebar collapses to hamburger

---

## Flow 2: ARENA MANAGER (`/admin/arenas/:id`)

Purpose: Full management view for a single arena with 5 tabs.

### Header

```
+--------------------------------------------+
| <- Back to Dashboard                       |
|                                            |
| NELK Boys Arena  [Beer Pong] [ACTIVE]      |
| Season 1 | Jun 1 - Aug 30, 2026 | 45d left|
|                                            |
| [Overview] [Captains] [Revenue] [Season] [Settings]
+--------------------------------------------+
```

### Tab 1: OVERVIEW

```
|  +--------+  +--------+  +--------+  +--------+  |
|  | 2,400  |  | 85     |  | $159K  |  | 64/75  |  |
|  | Players|  | Captns |  | Mo.Rev |  | Premierfill|
|  +--------+  +--------+  +--------+  +--------+  |
|                                                    |
|  DIVISIONS                                         |
|  +----------------------------------------------+ |
|  | Premier  [===========>    ] 64/75  85%        | |
|  | Challenger  2,336 (open capacity)             | |
|  +----------------------------------------------+ |
|                                                    |
|  RECENT ACTIVITY                                   |
|  +----------------------------------------------+ |
|  | * @new_player joined Beer Pong       2m ago   | |
|  | * @squad_leader reached 30 - Captain  1h ago  | |
|  | * Monthly payout cycle completed      1d ago  | |
|  | * @player_x referred 5 new members    2d ago  | |
|  | * Arena approved by ops team          5d ago  | |
|  +----------------------------------------------+ |
```

### Tab 2: CAPTAINS

```
|  TIER SUMMARY                                      |
|  +----------+  +----------+  +----------+          |
|  | P:Gold   |  | P:Silver |  | P:Bronze |          |
|  | 10 capts |  | 20 capts |  | 34 capts |          |
|  | $42,800  |  | $25,680  |  | $17,120  |          |
|  | avg $4.2K|  | avg $1.2K|  | avg $503 |          |
|  +----------+  +----------+  +----------+          |
|                                                     |
|  CAPTAIN LEADERBOARD       Division: [Premier v]    |
|  -------------------------------------------------- |
|  #   Captain          Squad       NCS    Tier       |
|  1   @beer_king       King Pong   6,120  Gold       |
|  2   @pong_master     Pong Stars  5,440  Gold       |
|  3   @mookie_butts    Team Mook   4,820  Gold  <-you|
|  ...                                                |
```

### Tab 3: REVENUE

```
|  +---------+  +---------+  +---------+  +---------+|
|  | $957.6K |  | $574.5K |  | $143.6K |  | $239.4K ||
|  | Total   |  | Host    |  | Captain |  | Platform||
|  +---------+  +---------+  +---------+  +---------+|
|                                                     |
|  REVENUE TREND                                      |
|  +----------------------------------------------+  |
|  |    ___                                        |  |
|  |   |   | ___                                   |  |
|  |  _|   ||   |                                  |  |
|  | |     ||   |                                  |  |
|  | Oct Nov Dec Jan Feb Mar                       |  |
|  +----------------------------------------------+  |
|                                                     |
|  REVENUE SPLIT                                      |
|  [====== Host 60% ======][Cap 15%][== Platform 25%] |
```

### Tab 4: SEASON

```
|  SEASON STATUS                                      |
|  +----------------------------------------------+  |
|  | Phase: Active  |  45 days remaining           |  |
|  | Next: Month 2 Payout Cycle (Aug 1)            |  |
|  +----------------------------------------------+  |
|                                                     |
|  TIMELINE                                           |
|  * Jun 1   Season 1 Launch              [launch]   |
|  * Jul 1   Month 1 Payout Cycle         [payout]   |
|  o Jul 15  Mid-season Review            [review]   |  <- current
|  . Aug 1   Month 2 Payout Cycle         [payout]   |
|  . Aug 25  Pre-Flush Preview            [flush]    |
|  . Aug 30  Season Flush + GT Draw       [flush]    |
|                                                     |
|  SEASON CONTROLS                                    |
|  +-------------------+  +-------------------+       |
|  | Start Payout      |  | Preview Flush     |       |
|  | Cycle              |  |                   |       |
|  | [Run Now]          |  | [Preview]         |       |
|  +-------------------+  +-------------------+       |
|  +-------------------+  +-------------------+       |
|  | Execute Flush     |  | Archive Season    |       |
|  | (irreversible)    |  |                   |       |
|  | [Execute]         |  | [Archive]         |       |
|  +-------------------+  +-------------------+       |
```

### Tab 5: SETTINGS

```
|  ARENA DETAILS                          [Edit]      |
|  +----------------------------------------------+  |
|  | Name:   NELK Boys Arena                       |  |
|  | Desc:   The ultimate beer pong experience...  |  |
|  +----------------------------------------------+  |
|                                                     |
|  ENTRY FEE                                          |
|  $399 per sport                                     |
|                                                     |
|  REVENUE SPLITS                                     |
|  [====== Host 60% ======][Cap 15%][Platform 25%]    |
|  Contact support to change splits.                  |
|                                                     |
|  DIVISIONS                                          |
|  Premier: 75 seats  |  Challenger: Open             |
|                                                     |
|  DANGER ZONE                                        |
|  +----------------------------------------------+  |
|  | [Pause Arena]    [End Season Early]            |  |
|  | Warning: These actions cannot be undone.       |  |
|  +----------------------------------------------+  |
```

---

## Flow 3: CREATE ARENA (`/admin/create`)

Purpose: 6-step wizard to set up and launch a new arena.

Same wizard as the player-facing `/create` route, reused in admin context.

```
Step 1: BASICS         Name, description, cover image, logo, dates
Step 2: SPORTS         Select sports, set entry fee, multi-sport subsidy
Step 3: REWARD         Title, description, hero image, gallery, winning slots
Step 4: DIVISIONS      Premier cap, Challenger, tier allocation (Gold/Silver/Bronze)
Step 5: REVENUE        Host/Captain/Platform splits, live calculator
Step 6: REVIEW         Summary of all config, "Launch Arena" button
```

Each step: progress bar at top, Back/Continue at bottom.

---

## Flow 4: AFFILIATE MANAGER (`/admin/arenas/:id/referrals`)

Purpose: Generate referral links for collaborators, track their performance.

### List View

```
+--------------------------------------------+
| <- NELK Boys Arena                         |
|                                            |
| AFFILIATE MANAGER                          |
| Generate referral links for collaborators  |
|                                            |
| +------------------+ +-----+ +----------+ |
| | Enter name...    | | 5 % | |Generate  | |
| +------------------+ +-----+ |Link      | |
|                               +----------+ |
|                                            |
| +----------------------------------------+|
| | (S) SteveWillDoIt                      ||
| |     fsp.app/join/nelk?ref=steve        ||
| |     8%  6.2K clicks  410 paid  $163K   ||
| |                                 [Copy] ||
| +----------------------------------------+|
|                                            |
| +----------------------------------------+|
| | (B) Bradley Martyn                     ||
| |     fsp.app/join/nelk?ref=brad         ||
| |     6%  3.9K clicks  234 paid  $93K   ||
| |                                 [Copy] ||
| +----------------------------------------+|
|                                            |
| +----------------------------------------+|
| | (D) Danny Duncan                       ||
| |     fsp.app/join/nelk?ref=danny        ||
| |     5%  890 clicks  58 paid  $23K     ||
| |                                 [Copy] ||
| +----------------------------------------+|
| ...                                        |
+--------------------------------------------+
```

**Interaction:** Click any person to see their profile.

### Profile View (click into a person)

```
+--------------------------------------------+
| <- All Affiliates                          |
|                                            |
| (S) SteveWillDoIt                          |
|     fsp.app/join/nelk?ref=steve     [Copy] |
|     8% commission                          |
|     Added 2026-02-20                       |
|                                            |
| FUNNEL                                     |
| +----------------------------------------+|
| |  6,200     ->     1,520    ->    410   ||
| |  Clicks   24.5%   Signups  27%  Paid   ||
| +----------------------------------------+|
|                                            |
| +--------+ +--------+ +--------+ +------+ |
| | $163K  | | 6.6%   | | $399   | |$13K  | |
| |Revenue | |Click to| |Rev per | |Comm. | |
| |Generat.| |Purchase| |Join    | |Earned| |
| +--------+ +--------+ +--------+ +------+ |
+--------------------------------------------+
```

---

## Flow 5: OPS REVIEW (`/admin/ops`)

Purpose: Platform admin reviews pending arena launches.

```
+--------------------------------------------+
| PENDING REVIEWS                            |
| Arenas awaiting approval.                  |
|                                            |
| +----------------------------------------+|
| | NELK Boys Arena                        ||
| | Submitted: Mar 19, 2026               ||
| | Host: @nelkboys                        ||
| | Sport: Beer Pong | Entry: $399         ||
| | Splits: 60 / 15 / 25                  ||
| |                                        ||
| | [Review Details] [Approve] [Reject]    ||
| +----------------------------------------+|
|                                            |
| +----------------------------------------+|
| | World Premier Squash          (faded)  ||
| | Submitted: Mar 18, 2026               ||
| | Host: @wps_official                    ||
| | ...                                    ||
| +----------------------------------------+|
+--------------------------------------------+
```

---

## Screen Inventory (Admin Panel)

| # | Screen | Route | Purpose |
|---|--------|-------|---------|
| 1 | Admin Dashboard | `/admin` | KPIs, arena list, quick actions |
| 2 | Arena Manager: Overview | `/admin/arenas/:id` | Stats, divisions, activity |
| 3 | Arena Manager: Captains | `/admin/arenas/:id` | Tier summary, leaderboard |
| 4 | Arena Manager: Revenue | `/admin/arenas/:id` | Financials, trend, splits |
| 5 | Arena Manager: Season | `/admin/arenas/:id` | Timeline, lifecycle controls |
| 6 | Arena Manager: Settings | `/admin/arenas/:id` | Config, danger zone |
| 7 | Affiliate Manager: List | `/admin/arenas/:id/referrals` | Name + link generator |
| 8 | Affiliate Manager: Profile | `/admin/arenas/:id/referrals` | Per-person funnel + KPIs |
| 9 | Create Arena | `/admin/create` | 6-step wizard |
| 10 | Ops Review | `/admin/ops` | Approve/reject arenas |

---

## Admin Layout

- **Sidebar:** Fixed 240px, dark navy (#0f172a), nav links with icons, user info at bottom
- **Main:** flex: 1, light gray bg (#f8fafc), 32px padding
- **Mobile:** Sidebar hidden, hamburger toggle, slide-in overlay
- **All pages:** max-width 700-900px, responsive down to 375px
