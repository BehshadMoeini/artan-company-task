"use client";
import React from 'react';
import { Edit2, Trash2, Calendar, FileText } from 'lucide-react';
import { Content } from '../types/content';

interface ContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
            {content.title}
          </h3>
          <div className="flex space-x-2 space-x-reverse ml-3 flex-shrink-0">
            <button
              onClick={() => onEdit(content)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              title="ویرایش"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(content.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {content.description && (
          <div className="mb-4">
            <div className="flex items-start space-x-2 space-x-reverse text-gray-600">
              <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed line-clamp-3">
                {content.description}
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2 text-xs text-gray-500">          <div className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-3 h-3" />
            <span>ایجاد: {content.createdAt}</span>
          </div>
          {content.updatedAt !== content.createdAt && (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Edit2 className="w-3 h-3" />
              <span>بروزرسانی: {content.updatedAt}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
