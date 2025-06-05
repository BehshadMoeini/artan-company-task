"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Content, ContentFormValues } from "../types/content";
import PersianCalendar from "../utils/persianCalendar";

interface ContentContextType {
  contents: Content[];
  addContent: (data: ContentFormValues) => void;
  updateContent: (id: string, data: ContentFormValues) => boolean;
  deleteContent: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const getInitialContents = (): Content[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("contents");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error("Error parsing stored contents:", error);
        }
      }
    }
    return [];
  };

  const [contents, setContents] = useState<Content[]>(getInitialContents);

  // Save to localStorage whenever contents change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contents", JSON.stringify(contents));
    }
  }, [contents]);
  const addContent = (data: ContentFormValues) => {
    const newContent: Content = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      createdAt: PersianCalendar.now(),
      updatedAt: PersianCalendar.now(),
    };
    setContents((prev) => [newContent, ...prev]);
  };
  const updateContent = (id: string, data: ContentFormValues): boolean => {
    let wasChanged = false;

    setContents((prev) =>
      prev.map((content) => {
        if (content.id === id) {
          // Check if content has actually changed
          const hasChanged =
            content.title !== data.title ||
            (content.description || "") !== data.description;

          if (hasChanged) {
            wasChanged = true;
            return {
              ...content,
              title: data.title,
              description: data.description,
              updatedAt: PersianCalendar.now(),
            };
          }
          // Return unchanged content if nothing changed
          return content;
        }
        return content;
      })
    );

    return wasChanged;
  };

  const deleteContent = (id: string) => {
    setContents((prev) => prev.filter((content) => content.id !== id));
  };

  const value: ContentContextType = {
    contents,
    addContent,
    updateContent,
    deleteContent,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};
