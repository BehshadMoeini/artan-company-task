"use client";
import { Home, BarChart3, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`bg-purple-900 text-white transition-all duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "w-full sm:w-80 md:w-64" : "w-full sm:w-80 md:w-16"}
          fixed md:relative h-full flex flex-col overflow-hidden
        `}
      >
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 p-2"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>{" "}
        <div className="p-4 flex items-center justify-center md:justify-start min-h-[4rem]">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            L
          </div>
          <span
            className={`font-bold text-lg ml-3 transition-opacity duration-300 whitespace-nowrap ${
              !isOpen ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
            }`}
          >
            LOGO
          </span>
        </div>{" "}
        <div className="px-4 py-2 text-center md:text-left">
          <p
            className={`text-xs text-purple-300 uppercase mb-2 transition-opacity duration-300 whitespace-nowrap ${
              !isOpen ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
            }`}
          >
            NAVIGATION
          </p>
        </div>{" "}
        <nav className="flex flex-col space-y-1 flex-1">
          <Link
            href="/"
            className={`flex items-center justify-center md:justify-start px-4 py-3 transition-colors group relative ${
              pathname === "/"
                ? "bg-purple-800 text-white border-r-4 border-purple-400"
                : "hover:bg-purple-800 text-purple-300"
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span
              className={`text-sm ml-3 transition-opacity whitespace-nowrap ${
                !isOpen ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
              }`}
            >
              Home
            </span>
          </Link>
          <Link
            href="/dashboard"
            className={`flex items-center justify-center md:justify-start px-4 py-3 transition-colors group relative ${
              pathname === "/dashboard"
                ? "bg-purple-800 text-white border-r-4 border-purple-400"
                : "hover:bg-purple-800 text-purple-300"
            }`}
          >
            <BarChart3 className="w-4 h-4 flex-shrink-0" />{" "}
            <span
              className={`text-sm ml-3 transition-opacity whitespace-nowrap ${
                !isOpen ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
              }`}
            >
              Dashboard
            </span>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
