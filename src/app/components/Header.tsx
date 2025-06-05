"use client";
import { Search, Bell, User, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const pathname = usePathname();
  return (
    <header
      className={`bg-purple-900 flex items-center justify-between px-4 py-3 border-b border-purple-800 relative z-30 transition-all duration-300`}
    >
      {" "}
      {/* Left section - Hamburger menu */}
      <div className="flex items-center">
        <button
          className="text-white hover:text-purple-300 rounded p-1 mr-4"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* Center navigation - Hidden on small screens */}
      <nav className="flex items-center space-x-6 lg:space-x-8 flex-1 justify-center">
        {" "}
        <Link
          href="/"
          className={`text-sm transition-colors ${
            pathname === "/"
              ? "text-white font-medium border-b-2 border-purple-400 pb-1"
              : "text-purple-300 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className={`text-sm transition-colors ${
            pathname === "/dashboard"
              ? "text-white font-medium border-b-2 border-purple-400 pb-1"
              : "text-purple-300 hover:text-white"
          }`}
        >
          Dashboard
        </Link>
      </nav>
      {/* Right section - Icons */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        <button className="relative text-purple-300 hover:text-white transition-colors p-1">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        </button>
        <button className="w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
          <User className="text-white w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
