import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Loader2, Send, X, Bot, User } from "lucide-react";
import { API_URL } from "../config/api";

const welcomeMessage = {
  role: "assistant",
  text: "Ask me anything about government schemes, eligibility, documents, and next steps."
};

const AIChatWidget = ({
  isOpen,
  onClose,
  currentLanguage,
  voiceTranscript,
  onVoiceTranscriptConsumed
}) => {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  const language = useMemo(() => currentLanguage || "en", [currentLanguage]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isOpen]);

  const sendMessage = async (messageText) => {
    const text = (messageText || "").trim();
    if (!text || loading) {
      return;
    }

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: text,
        language
      });

      const answer =
        response.data?.answer ||
        "I could not generate an answer right now. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Chat is currently unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !voiceTranscript) {
      return;
    }

    sendMessage(voiceTranscript);
    onVoiceTranscriptConsumed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceTranscript, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 w-[min(92vw,420px)] h-[min(72vh,560px)] bg-white border border-slate-200 rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden">
      <div className="bg-navy text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <p className="font-semibold leading-tight">YojanaSaathi AI</p>
            <p className="text-xs text-slate-200">Scheme assistant</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-100 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50">
        <div className="space-y-3">
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={`${message.role}-${index}-${message.text.slice(0, 10)}`}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${
                    isUser
                      ? "bg-navy text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  <div className="text-xs opacity-80 mb-1 flex items-center gap-1">
                    {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    <span>{isUser ? "You" : "Assistant"}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-3 py-2 text-slate-600 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 p-3 bg-white">
        {error && (
          <div className="mb-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1">
            {error}
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about scheme eligibility..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-navy text-white p-2 rounded-lg disabled:opacity-50 hover:bg-navy-hover transition-colors"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatWidget;
