import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav className="bg-tech-gray/50 backdrop-blur-md border-b border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <FaRobot className="text-neon-blue h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-stellar-blue bg-clip-text text-transparent">
              CryptoVault 2186
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;