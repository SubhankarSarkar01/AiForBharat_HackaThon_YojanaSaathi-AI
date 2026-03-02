import React, { useContext, useMemo, useState } from "react";
import { Mic, MessageCircle } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import AIChatWidget from "./AIChatWidget";

const languageCodeForSpeech = (appLanguage) => {
  const mapping = {
    en: "en-IN",
    hi: "hi-IN",
    bn: "bn-IN",
    ta: "ta-IN",
    te: "te-IN",
    kn: "kn-IN",
    mr: "mr-IN",
    gu: "gu-IN",
    pa: "pa-IN",
    ml: "ml-IN",
    or: "or-IN",
    as: "as-IN",
    ur: "ur-IN"
  };

  return mapping[appLanguage] || "en-IN";
};

const FloatingButtons = () => {
  const { t, currentLanguage } = useContext(LanguageContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const speechLanguage = useMemo(
    () => languageCodeForSpeech(currentLanguage),
    [currentLanguage]
  );

  const handleVoiceClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      if (!transcript.trim()) {
        return;
      }

      setVoiceTranscript(transcript);
      setIsChatOpen(true);
    };

    recognition.onerror = () => {
      window.alert("Could not capture voice input. Please try again.");
    };

    recognition.start();
  };

  return (
    <>
      <AIChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentLanguage={currentLanguage}
        voiceTranscript={voiceTranscript}
        onVoiceTranscriptConsumed={() => setVoiceTranscript("")}
      />

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          type="button"
          onClick={handleVoiceClick}
          className="group relative bg-white border border-slate-200 text-slate-700 p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy hover:-translate-y-1"
          aria-label="Voice Assistant"
        >
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Voice Assistant
          </span>
          <Mic
            className="w-6 h-6 drop-shadow-sm text-slate-700 group-hover:text-india-green transition-colors"
            strokeWidth={1.5}
          />
        </button>

        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="group relative bg-gradient-to-r from-navy to-navy-hover text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-navy/40 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy hover:-translate-y-1 animate-pulse-slow"
          aria-label="AI Chatbot"
        >
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t("aiAssistant") || "AI Chatbot"}
          </span>
          <MessageCircle className="w-6 h-6 drop-shadow-sm" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
