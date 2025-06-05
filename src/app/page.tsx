"use client";
import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useContent } from "./context/ContentContext";
import { useNotification } from "./context/NotificationContext";
import ContentCard from "./components/ContentCard";
import ContentModal from "./components/ContentModal";
import ConfirmationModal from "./components/ConfirmationModal";
import { Content, ContentFormValues } from "./types/content";

export default function Home() {
  const { contents, addContent, updateContent, deleteContent } = useContent();
  const { addNotification } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [deletingContentId, setDeletingContentId] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContents = contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (content.description &&
        content.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddNew = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingContentId(id);
    setIsConfirmModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deletingContentId) {
      deleteContent(deletingContentId);
      addNotification("محتوا حذف شد", "محتوا با موفقیت حذف شد");
      setDeletingContentId(null);
    }
  };
  const handleModalSubmit = (values: ContentFormValues) => {
    if (editingContent) {
      const wasChanged = updateContent(editingContent.id, values);
      if (wasChanged) {
        addNotification("محتوا بروزرسانی شد", "تغییرات با موفقیت ذخیره شد");
      } else {
        addNotification("تغییری اعمال نشد", "محتوا بدون تغییر باقی ماند");
      }
    } else {
      addContent(values);
      addNotification("محتوا اضافه شد", "محتوای جدید با موفقیت ایجاد شد");
    }
  };

  const deletingContent = contents.find((c) => c.id === deletingContentId);
  return (
    <div className="max-w-7xl mx-auto" dir="rtl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">مدیریت محتوا</h1>
            <p className="text-purple-300">مجموع {contents.length} محتوا</p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            dir="ltr"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن محتوای جدید
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در محتوا..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-4 pl-12 py-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              dir="rtl"
            />
          </div>
        </div>
      </div>
      {filteredContents.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {searchTerm ? "هیچ محتوایی یافت نشد" : "هنوز محتوایی اضافه نشده"}
          </h3>
          <p className="text-purple-300 mb-6">
            {searchTerm
              ? "لطفاً کلمات کلیدی دیگری امتحان کنید"
              : "برای شروع، اولین محتوای خود را اضافه کنید"}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              افزودن محتوای اول
            </button>
          )}
        </div>
      ) : (
        <div className={"space-y-4"}>
          {filteredContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={
          editingContent
            ? {
                title: editingContent.title,
                description: editingContent.description || "",
              }
            : { title: "", description: "" }
        }
        title={editingContent ? "ویرایش محتوا" : "افزودن محتوای جدید"}
      />{" "}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="حذف محتوا"
        message={
          deletingContent
            ? `آیا مطمئن هستید که می‌خواهید محتوای "${deletingContent.title}" را حذف کنید؟`
            : "آیا مطمئن هستید که می‌خواهید این محتوا را حذف کنید؟"
        }
      />
    </div>
  );
}
