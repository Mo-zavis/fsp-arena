import { useState, useRef, useEffect, useCallback } from 'react';
import './FspAiChat.css';

/* ── Icons ───────────────────────────────────────────── */

const ChatBotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="12" rx="3" />
    <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <path d="M9 17h6" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" />
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

export default function FspAiChat({ onCreateArena }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [flowDone, setFlowDone] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !flowDone) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen, flowDone]);

  const startCreateFlow = useCallback(() => {
    if (isTyping || flowDone) return;

    // User message
    const userMsg = { id: Date.now(), role: 'user', text: 'Create an Arena' };
    setMessages([userMsg]);
    setIsTyping(true);

    // AI acknowledges
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'ai',
        text: "Got it! I'm setting up your arena now. Let me configure the basics, sports, rewards, divisions, and revenue splits for you...",
      }]);
      setIsTyping(false);

      // Brief pause, then second message
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            role: 'ai',
            text: "**Champions League Arena** is ready for review! Opening the details now...",
          }]);
          setIsTyping(false);
          setFlowDone(true);

          // Auto-close panel and open review modal
          setTimeout(() => {
            setIsOpen(false);
            if (onCreateArena) onCreateArena();
          }, 1200);
        }, 1000);
      }, 800);
    }, 1200);
  }, [isTyping, flowDone, onCreateArena]);

  const sendMessage = useCallback((text) => {
    if (!text.trim() || isTyping || flowDone) return;

    const lower = text.toLowerCase();
    if (lower.includes('create') || lower.includes('arena')) {
      startCreateFlow();
      setInputValue('');
      return;
    }

    // For any other message, nudge toward the create flow
    const userMsg = { id: Date.now(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'ai',
        text: "I'm currently set up to help you **create an arena** using AI. Click the button below or type \"Create an Arena\" to get started!",
      }]);
      setIsTyping(false);
    }, 800);
  }, [isTyping, flowDone, startCreateFlow]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
  };

  // Reset state when reopening after flow is done
  const handleToggle = () => {
    if (!isOpen && flowDone) {
      setMessages([]);
      setFlowDone(false);
      setIsTyping(false);
    }
    setIsOpen(v => !v);
  };

  const hasMessages = messages.length > 0;

  function formatMessage(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  }

  return (
    <>
      {/* FAB */}
      <button
        className={`fsp-ai__fab${isOpen ? ' fsp-ai__fab--open' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close FSP AI' : 'Open FSP AI'}
      >
        {isOpen ? <CloseIcon /> : <ChatBotIcon />}
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
              <div className="fsp-ai__welcome-title">What would you like to create?</div>
              <div className="fsp-ai__welcome-desc">
                FSP AI can generate a complete arena setup for you — sports, rewards, divisions, revenue splits — all in seconds.
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

        {/* Single CTA: Create an Arena */}
        {!hasMessages && (
          <div className="fsp-ai__quick-actions">
            <button className="fsp-ai__create-btn" onClick={startCreateFlow}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Create an Arena
            </button>
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
            disabled={flowDone}
          />
          <button
            className="fsp-ai__send"
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping || flowDone}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}
