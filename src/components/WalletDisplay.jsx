import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaExternalLinkAlt, FaShieldAlt, FaPlay, FaStop, FaSync } from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';

const WalletDisplay = () => {
  const { 
    wallet, 
    loading, 
    scanHistory, 
    isAutoScanning,
    startAutoScan, 
    stopAutoScan,
    getLastScanTime,
    checkBalance 
  } = useWallet();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!wallet) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-lg bg-deep-space/80 hologram-bg hologram-border"
    >
      <div className="data-stream" />
      
      <div className="flex items-center justify-between mb-6 relative">
        <h2 className="text-2xl font-bold text-neon-blue">Wallet Details</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-neon-blue">
            <FaShieldAlt className="animate-pulse" />
            <span className="text-sm">Quantum Secured</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => checkBalance(wallet.address, wallet.currency)}
            disabled={loading || isAutoScanning}
            className="p-2 rounded-full bg-tech-gray/50 text-neon-blue hover:bg-tech-gray/70 disabled:opacity-50 hologram-border"
          >
            <FaSync className={loading ? 'animate-spin' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isAutoScanning ? stopAutoScan : startAutoScan}
            className={`p-2 rounded-full bg-tech-gray/50 hover:bg-tech-gray/70 hologram-border ${
              isAutoScanning ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {isAutoScanning ? <FaStop /> : <FaPlay />}
          </motion.button>
        </div>
      </div>
      
      <div className="space-y-4">
        <motion.div 
          className="p-4 rounded-lg bg-tech-gray/50 hover:bg-tech-gray/60 transition-colors hologram-bg relative"
          whileHover={{ scale: 1.01 }}
        >
          <div className="scanning-line" />
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Address</span>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(wallet.address)}
                className="text-neon-blue hover:text-stellar-blue transition-colors"
              >
                <FaCopy />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href={wallet.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:text-stellar-blue transition-colors"
              >
                <FaExternalLinkAlt />
              </motion.a>
            </div>
          </div>
          <p className="font-mono text-sm mt-2 break-all text-neon-blue/90">{wallet.address}</p>
        </motion.div>

        <motion.div 
          className="p-4 rounded-lg bg-tech-gray/50 hover:bg-tech-gray/60 transition-colors hologram-bg relative"
          whileHover={{ scale: 1.01 }}
        >
          <div className="scanning-line" />
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Private Key</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => copyToClipboard(wallet.privateKey)}
              className="text-neon-blue hover:text-stellar-blue transition-colors"
            >
              <FaCopy />
            </motion.button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-mono text-sm break-all text-neon-blue/90">
              {wallet.privateKey.substring(0, 20)}...
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="p-4 rounded-lg bg-tech-gray/50 hover:bg-tech-gray/60 transition-colors hologram-bg relative"
          whileHover={{ scale: 1.01 }}
        >
          <div className="scanning-line" />
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Balance</span>
            <span className="text-sm text-neon-blue/70">
              Last scan: {getLastScanTime()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <p className="font-mono text-xl text-neon-blue">
              {loading ? (
                <span className="flex items-center space-x-2">
                  <span className="hexagon-loader" />
                  <span className="animate-pulse">Scanning Network...</span>
                </span>
              ) : (
                `${wallet.balance} ${wallet.currency}`
              )}
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {scanHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-lg bg-tech-gray/50 hologram-bg relative"
            >
              <div className="scanning-line" />
              <h3 className="text-neon-blue mb-3">Scan History</h3>
              <div className="space-y-2">
                {scanHistory.map((scan, index) => (
                  <motion.div
                    key={scan.timestamp}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-neon-blue/70">
                      {new Date(scan.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`font-mono ${
                      parseFloat(scan.change) > 0 ? 'text-green-400' : 
                      parseFloat(scan.change) < 0 ? 'text-red-400' : 'text-neon-blue/70'
                    }`}>
                      {parseFloat(scan.change) > 0 ? '+' : ''}{scan.change} {wallet.currency}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WalletDisplay;