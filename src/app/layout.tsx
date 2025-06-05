"use client";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ContentProvider } from "./context/ContentContext";
import { NotificationProvider } from "./context/NotificationContext";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start closed on mobile

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" />
        <title>داشبورد مدیریت محتوا</title>
      </head>
      <body className="bg-purple-950 text-white">
        <NotificationProvider>
          <ContentProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <div className="flex-1 flex flex-col">
                <Header
                  toggleSidebar={toggleSidebar}
                  isSidebarOpen={isSidebarOpen}
                />
                <main className="flex-1 bg-purple-950 overflow-auto p-4 lg:p-6">
                  {children}
                </main>
              </div>
            </div>
          </ContentProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
