import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import WalletGenerator from './components/WalletGenerator';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-deep-space text-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<WalletGenerator />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;