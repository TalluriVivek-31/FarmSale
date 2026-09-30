import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, AlertTriangle, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  warning?: string;
  actions?: { label: string; tab: string }[];
}

const PRESET_QUERIES = [
  'What should I grow this season?',
  'Which nearby buyers need tomatoes?',
  'My crop is showing leaf curl symptoms',
  'How much cold storage capacity is open?',
  'Which buyer gives the better net return?'
];

export const FarmSaleAssistant: React.FC = () => {
  const { user } = useAuth();
  const { isAssistantOpen, setIsAssistantOpen, setCurrentTab } = useAppState();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: `Namaste${user?.name ? ` ${user.name}` : ''}! I am your FarmSale Agricultural Intelligence Assistant. I have access to your farm profile in ${user?.profile?.district || 'Nashik'}, ${user?.profile?.state || 'Maharashtra'}. How can I assist your crop planning or market fulfillment today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let warningText: string | undefined = undefined;
      let actions: { label: string; tab: string }[] | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('what should i grow') || lower.includes('season') || lower.includes('recommend')) {
        replyText =
          `Analyzing your farm location in ${user?.profile?.district || 'Nashik'}: current verified buyer demand shows strong forward orders for Processing Tomatoes (500 tonnes open from Sahyadri Foods at ₹2,800 to ₹3,200/quintal) and Red Onion (Garwa). For rainfed zones, Pigeonpea or Chickpea provide superior drought resilience and nitrogen fixation.`;
        actions = [{ label: 'Open FarmSale AI Planner', tab: 'crop-planner' }];
      } else if (lower.includes('buyer') || lower.includes('tomato')) {
        replyText =
          'Sahyadri Foods Processing Pvt Ltd has an open procurement contract for 500 tonnes of Grade A Processing Tomato at Dindori Processing Hub (Nashik district). Offered rate: ₹2,800 to ₹3,200/quintal with FPO aggregation support.';
        actions = [{ label: 'View Buyer Marketplace', tab: 'buyer-marketplace' }];
      } else if (lower.includes('symptom') || lower.includes('leaf curl') || lower.includes('pest') || lower.includes('disease')) {
        replyText =
          'Leaf curl in tomatoes is commonly vector-transmitted by whitefly (Bemisia tabaci). Recommended mitigation includes yellow sticky traps (15 per acre), avoiding excessive chemical nitrogen which promotes succulent foliage, and spraying neem-based formulations (Azadirachtin 1500 ppm).';
        warningText = 'AI guidance should be verified with a qualified agricultural professional.';
        actions = [{ label: 'Check Quality Intelligence', tab: 'quality-intelligence' }];
      } else if (lower.includes('storage') || lower.includes('cold')) {
        replyText =
          'Nashik Agro-Logistics Cold Chain Hub (9.4 km away on Pimpalgaon MIDC road) currently has 320 tonnes of available dual-zone capacity (2°C to 12°C) at an indicative ₹70 per quintal per month.';
        actions = [{ label: 'View Storage Network', tab: 'storage-network' }];
      } else if (lower.includes('net return') || lower.includes('price') || lower.includes('return')) {
        replyText =
          'Under FarmSale demand-driven contracts: Sahyadri Foods offers ₹3,100/quintal gross. Subtracting ₹48/qtl for refrigerated transit and ₹42/qtl for pre-cooling yields an estimated net realization of ₹3,010/quintal. This compares favorably against volatile local spot mandi bids averaging ₹2,200/qtl.';
        actions = [{ label: 'Open Income Planner', tab: 'income-simulator' }];
      } else {
        replyText =
          `I have cross-referenced your query with active database records for ${user?.profile?.district || 'your district'}. You can explore buyer demand or simulate net farm income using the navigation tabs.`;
        actions = [{ label: 'Explore Demand Intelligence', tab: 'demand-intelligence' }];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: replyText,
          timestamp: 'Just now',
          warning: warningText,
          actions
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-[#1b4332] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/40 border border-emerald-400/40 flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                FarmSale Assistant
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-200 rounded border border-emerald-400/30">
                  Context Aware
                </span>
              </h3>
              <p className="text-xs text-emerald-100/70">
                Ground-level agronomic and demand intelligence
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="px-4 py-2 bg-[#f4f7f4] border-b border-gray-200 flex items-center gap-2 text-[11px] text-gray-600">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>Responses use your saved farm profile and active database records.</span>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-emerald-800" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#1b4332] text-white rounded-tr-none'
                    : 'bg-[#fbfbfa] text-gray-800 border border-gray-200 rounded-tl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>

                {m.warning && (
                  <div className="mt-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 flex items-start gap-1.5 font-medium text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{m.warning}</span>
                  </div>
                )}

                {m.actions && m.actions.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex flex-wrap gap-1.5">
                    {m.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setCurrentTab(act.tab as any);
                          setIsAssistantOpen(false);
                        }}
                        className="text-[11px] px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-800 font-semibold rounded-md border border-emerald-300 transition-colors shadow-xs"
                      >
                        {act.label} &rarr;
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-emerald-200/70' : 'text-gray-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#1b4332] flex items-center justify-center shrink-0 mt-0.5 text-white">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-500 italic">
              <Bot className="w-4 h-4 text-emerald-700 animate-spin" />
              <span>Analyzing agronomic parameters and buyer demand...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 border-t border-gray-100 bg-[#fbfbfa]">
          <div className="text-[11px] font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Suggested questions
          </div>
          <div className="flex flex-wrap gap-1">
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] px-2 py-1 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 border border-gray-200 hover:border-emerald-300 rounded-md transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, prices, pests, or cold storage..."
            className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 bg-[#1b4332] text-white rounded-lg hover:bg-[#143628] disabled:opacity-40 transition-colors shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
