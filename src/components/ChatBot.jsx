import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm Udith's AI Assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    setError("");

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: userText,
            context: PORTFOLIO_DATA, // give AI full profile knowledge
        }),

      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Sorry, I'm having trouble answering right now.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.reply || "…" },
        ]);
      }
    } catch (e) {
      setError("Network error while talking to AI.");
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I ran into a network error. Please try again in a moment.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-28 right-6 w-80 md:w-96 h-[480px] bg-[#0f1624] border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[90] backdrop-blur-xl"
          >
            <div className="p-4 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Udith&apos;s AI Agent
                  </h3>
                  <span className="text-xs text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-md ${
                      msg.role === "user"
                        ? "bg-cyan-600 text-white rounded-tr-sm"
                        : "bg-gray-800 text-gray-200 rounded-tl-sm border border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="text-gray-500 text-xs ml-4">
                  AI is typing…
                </div>
              )}
              {error && (
                <div className="text-red-400 text-xs ml-4">{error}</div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-gray-800 bg-[#0a0f16] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about my skills…"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] border border-white/10 z-[95]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
