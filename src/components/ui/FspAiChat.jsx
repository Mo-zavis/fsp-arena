import { useState, useRef, useEffect, useCallback } from 'react';
import './FspAiChat.css';

/* ── Mock AI response logic ─────────────────────────── */

const RESPONSES = [
  {
    match: (t) => t.includes('create') && t.includes('arena'),
    reply:
      "I can help you create an arena! Here's what we'll set up together:\n\n" +
      "1. **Arena basics** — name, description, cover image, season dates\n" +
      "2. **Sports** — pick which sports your players compete in\n" +
      "3. **Reward** — define the prize and how winners are selected\n" +
      "4. **Divisions & tiers** — set Premier seat caps and Gold/Silver/Bronze splits\n" +
      "5. **Revenue model** — configure host, captain, and platform splits\n\n" +
      "Want me to walk you through each step, or jump straight to the [Arena Creator](/create)?",
  },
  {
    match: (t) => t.includes('sport'),
    reply:
      "FSP Arena currently supports these sports:\n\n" +
      "**Beer Pong** · **Squash** · **Bowling** · **Soccer** · **Basketball** · **Tennis** · **Swimming** · **Golf**\n\n" +
      "Each arena can host one or more sports. Players who join multiple sports in the same arena get a **subsidy discount** (configurable by the host, default 50% off the second sport).\n\n" +
      "Want to set up a multi-sport arena?",
  },
  {
    match: (t) => t.includes('revenue') || t.includes('split') || t.includes('money') || t.includes('earn'),
    reply:
      "Revenue in FSP Arena is split three ways:\n\n" +
      "**Host** — typically 55-65% of entry fees. This is your cut as the arena creator.\n\n" +
      "**Captain Pool** — typically 10-20%. Distributed monthly to captains based on their NCS (Net Captain Score) and tier ranking.\n\n" +
      "**Platform** — typically 20-30%. FSP's fee for infrastructure, payments, and support.\n\n" +
      "For example, with 10,000 players at $399 entry and a 60/15/25 split:\n• Host earns **$2.39M**\n• Captain Pool: **$598K**\n• Platform: **$997K**\n\n" +
      "You can adjust these splits when [creating your arena](/create).",
  },
  {
    match: (t) => t.includes('division') || t.includes('tier') || t.includes('premier') || t.includes('challenger'),
    reply:
      "Divisions organize players into competitive brackets:\n\n" +
      "**Premier Division** — Limited seats (e.g., 75). Top performers compete here for the biggest payouts. Broken into **Gold**, **Silver**, and **Bronze** tiers based on NCS rankings.\n\n" +
      "**Challenger Division** — Open capacity. Anyone can join. Same tier structure, but the payout pool is proportionally smaller.\n\n" +
      "Captains get **promoted or relegated** monthly between tiers based on their squad's performance. The tier allocation (e.g., 50% Gold / 30% Silver / 20% Bronze) determines how the captain pool is distributed.",
  },
  {
    match: (t) => t.includes('captain') || t.includes('squad') || t.includes('recruit'),
    reply:
      "Captains are the growth engine of FSP Arena.\n\n" +
      "**How it works:**\n" +
      "1. A player joins an arena and gets a **referral link**\n" +
      "2. They recruit others using that link\n" +
      "3. Once they hit **30 paid referrals**, they become a **Captain**\n" +
      "4. Captains earn **monthly payouts** from the Captain Pool based on their NCS\n\n" +
      "**NCS (Net Captain Score)** factors in squad size, member activity (sessions played), and retention depth (how deep the referral tree goes).\n\n" +
      "Top captains in Premier Gold can earn **$4,000+/month** per arena.",
  },
  {
    match: (t) => t.includes('reward') || t.includes('prize') || t.includes('win'),
    reply:
      "Each arena has a **Reward** that players compete for:\n\n" +
      "**Performance Slots** — Top performers (e.g., top 15) win the reward based on rankings.\n\n" +
      "**Golden Ticket Slots** — Random wild cards (e.g., 5 slots) drawn from all participants, giving everyone a chance regardless of rank.\n\n" +
      "Rewards can be anything — cash prizes, trips, experiences, merchandise. For example, the NELK Boys Arena offers a **Trip to Cancun + $10,000 Cash Prize** for the top 15, plus 5 Golden Ticket slots.\n\n" +
      "You define this in Step 3 of the [arena creation flow](/create).",
  },
  {
    match: (t) => t.includes('affiliate') || t.includes('referral') || t.includes('collaborator'),
    reply:
      "The **Affiliate Manager** lets you create trackable referral links for collaborators and influencers.\n\n" +
      "For each affiliate you can:\n" +
      "• Set a **custom commission %** (e.g., 5-10%)\n" +
      "• Track **clicks → signups → paid joins** funnel\n" +
      "• See **revenue attributed** to each link\n" +
      "• Monitor conversion rates and ROI\n\n" +
      "You can manage affiliates from the [Affiliate Manager](/admin/arenas/nelk/referrals) in the Host Panel.",
  },
  {
    match: (t) => t.includes('hello') || t.includes('hi') || t.includes('hey') || t.includes('sup'),
    reply:
      "Hey! 👋 I'm FSP AI, your arena assistant.\n\n" +
      "I can help you with:\n" +
      "• **Creating an arena** — walk you through the setup\n" +
      "• **Understanding the model** — revenue splits, divisions, captains\n" +
      "• **Managing your arenas** — affiliates, seasons, payouts\n\n" +
      "What would you like to explore?",
  },
];

const DEFAULT_REPLY =
  "Great question! I can help with arena creation, sports setup, revenue splits, divisions, captain mechanics, rewards, and affiliate management.\n\nTry asking me something like **\"Help me create an arena\"** or **\"How do revenue splits work?\"** and I'll walk you through it.";

function getMockResponse(text) {
  const lower = text.toLowerCase();
  for (const r of RESPONSES) {
    if (r.match(lower)) return r.reply;
  }
  return DEFAULT_REPLY;
}

/* ── Simple markdown-like formatting ─────────────────── */

function formatMessage(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br/>');
}

/* ── Quick action suggestions ────────────────────────── */

const QUICK_ACTIONS = [
  'Help me create an arena',
  'How do revenue splits work?',
  'What sports are available?',
  'Explain divisions and tiers',
  'How do captains earn?',
  'Tell me about rewards',
];

/* ── SVG Icons ───────────────────────────────────────── */

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="11" y1="3" x2="3" y2="11" />
    <line x1="3" y1="3" x2="11" y2="11" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2L7 9" />
    <path d="M14 2L9.5 14L7 9L2 6.5L14 2Z" />
  </svg>
);

/* ── Component ───────────────────────────────────────── */

export default function FspAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll on new messages or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback((text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Mock AI response with delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const reply = getMockResponse(text);
      setMessages((prev) => [...prev, { id: Date.now(), role: 'ai', text: reply }]);
      setIsTyping(false);
    }, delay);
  }, [isTyping]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    // Auto-grow textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* FAB */}
      <button
        className={`fsp-ai__fab${isOpen ? ' fsp-ai__fab--open' : ''}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close FSP AI' : 'Open FSP AI'}
      >
        {isOpen ? <CloseIcon /> : <SparkleIcon />}
      </button>

      {/* Backdrop */}
      <div
        className={`fsp-ai__backdrop${isOpen ? ' fsp-ai__backdrop--visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div className={`fsp-ai__panel${isOpen ? ' fsp-ai__panel--open' : ''}`}>
        {/* Header */}
        <div className="fsp-ai__header">
          <div className="fsp-ai__header-icon">AI</div>
          <div className="fsp-ai__header-text">
            <div className="fsp-ai__header-title">FSP AI</div>
            <div className="fsp-ai__header-sub">Arena Assistant</div>
          </div>
          <button className="fsp-ai__close" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="fsp-ai__messages">
          {!hasMessages && (
            <div className="fsp-ai__welcome">
              <div className="fsp-ai__welcome-icon">AI</div>
              <div className="fsp-ai__welcome-title">How can I help?</div>
              <div className="fsp-ai__welcome-desc">
                I can help you create arenas, understand revenue models, configure divisions, and more.
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`fsp-ai__msg fsp-ai__msg--${msg.role}`}
              dangerouslySetInnerHTML={
                msg.role === 'ai'
                  ? { __html: formatMessage(msg.text) }
                  : undefined
              }
            >
              {msg.role === 'user' ? msg.text : undefined}
            </div>
          ))}

          {isTyping && (
            <div className="fsp-ai__typing">
              <div className="fsp-ai__typing-dot" />
              <div className="fsp-ai__typing-dot" />
              <div className="fsp-ai__typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        {!hasMessages && (
          <div className="fsp-ai__quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action}
                className="fsp-ai__quick-btn"
                onClick={() => sendMessage(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="fsp-ai__input-area">
          <textarea
            ref={textareaRef}
            className="fsp-ai__input"
            placeholder="Ask FSP AI anything..."
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="fsp-ai__send"
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}
