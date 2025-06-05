"use client";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-900 rounded-lg shadow-xl max-w-md w-full border border-purple-700">
        <div className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
          <p className="text-sm text-purple-200 leading-relaxed mb-6">{message}</p>
          <div className="flex justify-end space-x-3 space-x-reverse">
            <button onClick={onClose} className="px-4 py-2 text-purple-200 bg-purple-800 hover:bg-purple-700 rounded-lg">
              انصراف
            </button>
            <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg">
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
