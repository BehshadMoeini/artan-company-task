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
    return [
      {
        id: "1",
        title: "آموزش React و Next.js",
        description:
          "در این مقاله به بررسی اصول اولیه React و Next.js می‌پردازیم و یاد می‌گیریم چگونه یک پروژه مدرن ایجاد کنیم. همچنین با hook های جدید و مفاهیم پیشرفته آشنا خواهیم شد.",
        createdAt: PersianCalendar.now(),
        updatedAt: PersianCalendar.now(),
      },
      {
        id: "2",
        title: "مدیریت State با Context API",
        description:
          "Context API یکی از ابزارهای قدرتمند React برای مدیریت state در سطح اپلیکیشن است. در این مطلب نحوه پیاده‌سازی و استفاده از Context API را بررسی می‌کنیم.",
        createdAt: PersianCalendar.daysAgo(1),
        updatedAt: PersianCalendar.daysAgo(1),
      },
      {
        id: "3",
        title: "طراحی UI/UX مدرن",
        description:
          "اصول طراحی رابط کاربری مدرن و بهترین روش‌های UX برای ایجاد تجربه کاربری بهتر.",
        createdAt: PersianCalendar.daysAgo(2),
        updatedAt: PersianCalendar.daysAgo(2),
      },
      {
        id: "4",
        title: "بهینه‌سازی عملکرد وب‌سایت",
        description:
          "تکنیک‌های مختلف برای بهبود سرعت و عملکرد وب‌سایت‌ها شامل lazy loading، code splitting، و تنظیمات سرور.",
        createdAt: PersianCalendar.daysAgo(3),
        updatedAt: PersianCalendar.daysAgo(3),
      },
      {
        id: "5",
        title: "اصول امنیت در برنامه‌نویسی",
        createdAt: PersianCalendar.daysAgo(4),
        updatedAt: PersianCalendar.daysAgo(4),
      },
    ];
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
