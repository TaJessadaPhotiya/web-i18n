import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "th", label: "ไทย" },
    { code: "en", label: "EN" },
    { code: "zh", label: "中文" },
    { code: "ja", label: "日本語" },
  ];

  return (
    <div className="flex gap-2 items-center">
      <span>{t("changeLanguage")}:</span>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-pink-400"
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
