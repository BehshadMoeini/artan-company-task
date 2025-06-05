"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { ContentFormValues } from "../types/content";

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ContentFormValues) => void;
  initialValues?: ContentFormValues;
  title: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("عنوان الزامی است")
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(20, "عنوان نباید بیش از ۲۰ کاراکتر باشد"),
  description: Yup.string().max(50, "توضیحات نباید بیش از ۵۰ کاراکتر باشد"),
});

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues = { title: "", description: "" },
  title,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (values: ContentFormValues) => {
    onSubmit(values);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-700">
        <div className="flex items-center justify-between p-6 border-b border-purple-700">
          <h2 className="text-xl font-semibold text-white">{title}</h2>{" "}
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-purple-200 mb-2"
                >
                  عنوان *
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`w-full px-3 py-2 bg-purple-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-purple-300 ${
                    errors.title && touched.title
                      ? "border-red-500 bg-red-900/30"
                      : "border-purple-600 hover:border-purple-500"
                  }`}
                  placeholder="عنوان محتوا را وارد کنید"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-purple-200 mb-2"
                >
                  توضیحات
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className={`w-full px-3 py-2 bg-purple-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical text-white placeholder-purple-300 ${
                    errors.description && touched.description
                      ? "border-red-500 bg-red-900/30"
                      : "border-purple-600 hover:border-purple-500"
                  }`}
                  placeholder="توضیحات محتوا را وارد کنید (اختیاری)"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-purple-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 m-2 py-2 text-purple-200 bg-purple-800 hover:bg-purple-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-600"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContentModal;
