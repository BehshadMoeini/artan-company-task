import { Search, Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header
      className={`bg-purple-900 flex items-center justify-between px-4 py-3 border-b border-purple-800 relative z-30 transition-all duration-300`}
    >
      {/* Left section - Hamburger menu */}
      <div className="flex items-center">
        <button
          className="text-white hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1 mr-4"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Center navigation - Hidden on small screens */}
      <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 justify-center">
        <a
          href="#"
          className="text-purple-300 hover:text-white text-sm transition-colors duration-200"
        >
          Lorem Ipsum
        </a>
        <a
          href="#"
          className="text-purple-300 hover:text-white text-sm transition-colors duration-200"
        >
          Dolor Sit
        </a>
        <a href="#" className="text-white font-medium text-sm">
          Amet lorem
        </a>
        <a
          href="#"
          className="text-purple-300 hover:text-white text-sm transition-colors duration-200"
        >
          lorem Sitam
        </a>
      </nav>

      {/* Right section - Icons */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        <button className="text-purple-300 hover:text-white transition-colors duration-200 p-1">
          <Search className="w-5 h-5" />
        </button>
        <button className="relative text-purple-300 hover:text-white transition-colors duration-200 p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </button>
        <button className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors duration-200">
          <User className="text-white w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
