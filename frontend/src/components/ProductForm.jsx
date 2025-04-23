import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FiSave, FiX } from "react-icons/fi";

const initialState = {
  th: { name: "", description: "" },
  en: { name: "", description: "" },
  zh: { name: "", description: "" },
  ja: { name: "", description: "" },
};

function ProductForm({ selected, onSave, onCancel }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selected) {
      const map = {};
      selected.translations?.forEach((t) => {
        map[t.lang] = { name: t.name, description: t.description };
      });
      setForm({ ...initialState, ...map });
    } else {
      setForm(initialState);
    }
  }, [selected]);

  const handleChange = (lang, field, value) => {
    setForm({ ...form, [lang]: { ...form[lang], [field]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const translations = Object.keys(form)
        .filter((lang) => form[lang].name || form[lang].description)
        .map((lang) => ({
          lang,
          ...form[lang],
        }));

      if (translations.length === 0) {
        throw new Error(t("error.at_least_one_language"));
      }

      if (selected) {
        await axios.put(`/api/products/${selected.id}`, { translations });
      } else {
        await axios.post("/api/products", { translations });
      }

      onSave();
    } catch (error) {
      console.error("Error saving product:", error);
      setError(error.message || t("error.saving_product"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {selected ? t("Edit Product") : t("Add New Product")}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["th", "en", "zh", "ja"].map((lang) => (
              <div
                key={lang}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-3">
                  <span className="inline-block w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center justify-center font-bold">
                    {lang.toUpperCase()}
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t(`language.${lang}`)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor={`${lang}-name`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("name")}
                    </label>
                    <input
                      id={`${lang}-name`}
                      type="text"
                      placeholder={t("product_name_placeholder")}
                      value={form[lang].name}
                      onChange={(e) =>
                        handleChange(lang, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${lang}-description`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("description")}
                    </label>
                    <textarea
                      id={`${lang}-description`}
                      rows={3}
                      placeholder={t("product_description_placeholder")}
                      value={form[lang].description}
                      onChange={(e) =>
                        handleChange(lang, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white rounded-md disabled:opacity-50 transition"
            >
              <FiX className="mr-2" />
              {t("cancel")}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 transition"
            >
              <FiSave className="mr-2" />
              {isSubmitting
                ? t("saving") + "..."
                : selected
                ? t("update")
                : t("create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
