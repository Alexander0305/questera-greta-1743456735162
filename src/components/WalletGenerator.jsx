import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEthereum, FaBitcoin, FaWallet } from 'react-icons/fa';
import { SiDogecoin, SiCardano, SiPolkadot, SiBinance } from 'react-icons/si';
import WalletDisplay from './WalletDisplay';
import AnalyticsDashboard from './AnalyticsDashboard';
import { useWallet } from '../context/WalletContext';

const WalletGenerator = () => {
  const { generateWallet, stopAutoScan } = useWallet();
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');

  useEffect(() => {
    stopAutoScan();
  }, [selectedCrypto, stopAutoScan]);

  const cryptoOptions = [
    { id: 'ETH', name: 'Ethereum', icon: <FaEthereum />, color: 'from-blue-500 to-purple-500' },
    { id: 'BTC', name: 'Bitcoin', icon: <FaBitcoin />, color: 'from-orange-500 to-yellow-500' },
    { id: 'DOGE', name: 'Dogecoin', icon: <SiDogecoin />, color: 'from-yellow-400 to-yellow-600' },
    { id: 'ADA', name: 'Cardano', icon: <SiCardano />, color: 'from-blue-400 to-blue-600' },
    { id: 'DOT', name: 'Polkadot', icon: <SiPolkadot />, color: 'from-pink-500 to-purple-500' },
    { id: 'BNB', name: 'Binance', icon: <SiBinance />, color: 'from-yellow-500 to-yellow-700' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="bg-tech-gray/40 backdrop-blur-lg rounded-xl p-8 hologram-bg hologram-border">
          <div className="data-stream" />
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neon-blue to-stellar-blue bg-clip-text text-transparent relative">
            Quantum Wallet Generator
            <div className="scanning-line" />
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {cryptoOptions.map((crypto) => (
              <motion.button
                key={crypto.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCrypto(crypto.id)}
                className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border-2 transition-all duration-300 hologram-bg ${
                  selectedCrypto === crypto.id
                    ? 'border-neon-blue bg-cosmic-purple/30 shadow-neon'
                    : 'border-gray-600 hover:border-neon-blue/50'
                }`}
              >
                <div className={`text-2xl bg-gradient-to-r ${crypto.color} p-3 rounded-full relative`}>
                  {crypto.icon}
                  <div className="scanning-line" />
                </div>
                <span className="text-sm font-medium text-neon-blue">{crypto.name}</span>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => generateWallet(selectedCrypto)}
            className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-neon-blue to-stellar-blue text-white font-bold text-lg shadow-neon hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 hologram-bg relative"
          >
            <div className="scanning-line" />
            <FaWallet className="animate-pulse-slow" />
            <span>Generate New {selectedCrypto} Wallet</span>
          </motion.button>

          <WalletDisplay />
        </div>

        <AnalyticsDashboard currency={selectedCrypto} />
      </motion.div>
    </div>
  );
};

export default WalletGenerator;