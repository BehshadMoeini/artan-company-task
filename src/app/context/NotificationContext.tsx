"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle, X } from "lucide-react";

interface NotificationContextType {
  addNotification: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    Array<{ id: string; title: string; message?: string }>
  >([]);

  const addNotification = (title: string, message?: string) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, title, message }]);
    setTimeout(
      () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
      3000
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-4 left-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 rounded-lg border shadow-lg flex items-start space-x-3 space-x-reverse bg-purple-900 border-purple-700 text-white"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              {notification.message && (
                <p className="text-sm mt-1 text-purple-200">
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                setNotifications((prev) =>
                  prev.filter((n) => n.id !== notification.id)
                )
              }
              className="text-purple-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
