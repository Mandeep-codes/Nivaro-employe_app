import React from 'react';
import { Menu, Globe, Bell } from 'lucide-react';

interface HeaderProps {
  notificationCount: number;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ notificationCount, onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm px-4 py-3 flex items-center justify-between z-30">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onMenuClick}
          className="text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-bold text-blue-600">Nivaro</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
          ENG
        </button>
        <button className="text-gray-600">
          <Globe size={20} />
        </button>
        <button className="relative text-gray-600">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;