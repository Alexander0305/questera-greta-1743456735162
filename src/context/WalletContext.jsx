import React, { createContext, useContext, useState, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [isAutoScanning, setIsAutoScanning] = useState(false);
  const [scanInterval, setScanInterval] = useState(null);

  const getAddressPrefix = (currency) => {
    switch (currency) {
      case 'BTC': return 'bc1';
      case 'ETH': case 'BNB': return '0x';
      case 'ADA': return 'addr1';
      case 'DOT': return '1';
      case 'DOGE': return 'D';
      default: return '0x';
    }
  };

  const getExplorerUrl = (address, currency) => {
    switch (currency) {
      case 'BTC': return `https://blockchain.com/btc/address/${address}`;
      case 'ETH': return `https://etherscan.io/address/${address}`;
      case 'DOGE': return `https://dogechain.info/address/${address}`;
      case 'ADA': return `https://cardanoscan.io/address/${address}`;
      case 'DOT': return `https://polkascan.io/polkadot/account/${address}`;
      case 'BNB': return `https://bscscan.com/address/${address}`;
      default: return `https://etherscan.io/address/${address}`;
    }
  };

  const generateWallet = async (currency) => {
    setLoading(true);
    stopAutoScan(); // Stop previous scan if running
    
    const prefix = getAddressPrefix(currency);
    const addressLength = currency === 'BTC' ? 42 : 40;
    const address = `${prefix}${Array(addressLength).fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    const mockWallet = {
      address,
      privateKey: `0x${Array(64).fill(0)
        .map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      currency,
      balance: '0.00',
      lastScan: new Date().toISOString()
    };
    
    setWallet(mockWallet);
    await checkBalance(mockWallet.address, currency);
    setLoading(false);
  };

  const checkBalance = useCallback(async (address, currency) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let mockBalance;
    const fluctuation = Math.random() * 0.1 - 0.05; // -5% to +5% change

    switch (currency) {
      case 'BTC': mockBalance = (Math.random() * 2).toFixed(8); break;
      case 'ETH': mockBalance = (Math.random() * 10).toFixed(6); break;
      case 'DOGE': mockBalance = (Math.random() * 10000).toFixed(2); break;
      case 'ADA': mockBalance = (Math.random() * 5000).toFixed(2); break;
      case 'DOT': mockBalance = (Math.random() * 100).toFixed(4); break;
      case 'BNB': mockBalance = (Math.random() * 50).toFixed(4); break;
      default: mockBalance = (Math.random() * 10).toFixed(4);
    }

    const currentTime = new Date().toISOString();
    const newScanEntry = {
      timestamp: currentTime,
      balance: mockBalance,
      change: scanHistory.length > 0 ? 
        (parseFloat(mockBalance) - parseFloat(scanHistory[0].balance)).toFixed(8) : '0.00'
    };

    setScanHistory(prev => [newScanEntry, ...prev].slice(0, 10));
    
    setWallet(prev => ({ 
      ...prev, 
      balance: mockBalance,
      lastScan: currentTime,
      explorerUrl: getExplorerUrl(address, currency)
    }));
    
    setLoading(false);
  }, [scanHistory]);

  const startAutoScan = useCallback(() => {
    if (!wallet || isAutoScanning) return;
    
    setIsAutoScanning(true);
    const interval = setInterval(() => {
      checkBalance(wallet.address, wallet.currency);
    }, 10000); // Scan every 10 seconds
    
    setScanInterval(interval);
  }, [wallet, isAutoScanning, checkBalance]);

  const stopAutoScan = useCallback(() => {
    if (scanInterval) {
      clearInterval(scanInterval);
      setScanInterval(null);
    }
    setIsAutoScanning(false);
  }, [scanInterval]);

  const getLastScanTime = useCallback(() => {
    if (!wallet?.lastScan) return '';
    return formatDistanceToNow(new Date(wallet.lastScan), { addSuffix: true });
  }, [wallet?.lastScan]);

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      loading, 
      scanHistory,
      isAutoScanning,
      generateWallet, 
      checkBalance,
      startAutoScan,
      stopAutoScan,
      getLastScanTime
    }}>
      {children}
    </WalletContext.Provider>
  );
};