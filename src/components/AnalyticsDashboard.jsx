import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { FaChartLine, FaExchangeAlt, FaServer, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';

const AnalyticsDashboard = ({ currency }) => {
  const [priceData, setPriceData] = useState([]);
  const [networkStats, setNetworkStats] = useState({
    transactions: 0,
    blockHeight: 0,
    hashRate: 0,
    lastUpdate: new Date()
  });

  useEffect(() => {
    // Simulate real-time price data updates
    const interval = setInterval(() => {
      const now = new Date();
      const newPrice = Math.random() * getPriceRange(currency);
      setPriceData(prev => [...prev, {
        time: format(now, 'HH:mm:ss'),
        price: newPrice
      }].slice(-20));

      // Update network stats
      setNetworkStats(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 10),
        blockHeight: prev.blockHeight + 1,
        hashRate: prev.hashRate + (Math.random() * 2 - 1),
        lastUpdate: now
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [currency]);

  const getPriceRange = (curr) => {
    switch (curr) {
      case 'BTC': return 50000;
      case 'ETH': return 3000;
      case 'BNB': return 300;
      case 'ADA': return 2;
      case 'DOT': return 20;
      case 'DOGE': return 0.2;
      default: return 1000;
    }
  };

  const priceChartOption = {
    grid: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: priceData.map(d => d.time),
      axisLine: {
        lineStyle: { color: '#00f6ff40' }
      },
      axisLabel: { color: '#00f6ff' }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: '#00f6ff40' }
      },
      axisLabel: { color: '#00f6ff' },
      splitLine: {
        lineStyle: { color: '#00f6ff20' }
      }
    },
    series: [{
      data: priceData.map(d => d.price),
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        color: '#00f6ff',
        width: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{
            offset: 0,
            color: '#00f6ff40'
          }, {
            offset: 1,
            color: '#00f6ff10'
          }]
        }
      }
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(26, 27, 46, 0.8)',
      borderColor: '#00f6ff',
      textStyle: { color: '#fff' }
    },
    animation: true
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-lg bg-tech-gray/40 hologram-bg hologram-border"
    >
      <div className="data-stream" />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neon-blue flex items-center gap-2">
          <FaChartLine />
          Network Analytics
        </h2>
        <span className="text-sm text-neon-blue/70 flex items-center gap-2">
          <FaClock />
          Last Update: {format(networkStats.lastUpdate, 'HH:mm:ss')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg bg-tech-gray/50 hologram-bg relative"
        >
          <div className="scanning-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Transactions</p>
              <p className="text-2xl text-neon-blue font-mono">
                {networkStats.transactions.toLocaleString()}
              </p>
            </div>
            <FaExchangeAlt className="text-2xl text-neon-blue/50" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg bg-tech-gray/50 hologram-bg relative"
        >
          <div className="scanning-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Block Height</p>
              <p className="text-2xl text-neon-blue font-mono">
                {networkStats.blockHeight.toLocaleString()}
              </p>
            </div>
            <FaServer className="text-2xl text-neon-blue/50" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-lg bg-tech-gray/50 hologram-bg relative"
        >
          <div className="scanning-line" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hash Rate (TH/s)</p>
              <p className="text-2xl text-neon-blue font-mono">
                {networkStats.hashRate.toFixed(2)}
              </p>
            </div>
            <div className="hexagon-loader" />
          </div>
        </motion.div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-lg bg-tech-gray/50 p-4 hologram-bg relative"
      >
        <div className="scanning-line" />
        <h3 className="text-neon-blue mb-4">Price Chart ({currency}/USD)</h3>
        <ReactECharts 
          option={priceChartOption}
          style={{ height: '300px', width: '100%' }}
          className="hologram-bg"
        />
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;