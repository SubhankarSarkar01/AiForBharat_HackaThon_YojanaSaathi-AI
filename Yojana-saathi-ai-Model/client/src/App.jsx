import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchSchemes from './pages/SearchSchemes';
import SchemeRecommendation from './pages/SchemeRecommendation';
import Auth from './pages/Auth';
import LanguageSelection from './components/LanguageSelection';
import FloatingButtons from './components/FloatingButtons';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';

const AppContent = () => {
  const { currentLanguage } = useContext(LanguageContext);

  if (!currentLanguage) {
    return <LanguageSelection />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 relative">
        <Navbar />
        <main className="flex-grow animate-[fadeIn_0.5s_ease-in-out]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchSchemes />} />
            <Route path="/recommend" element={<SchemeRecommendation />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
