import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n/i18n";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ProductList from "./components/ProductList";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-6 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center">
        <LanguageSwitcher />
        <DarkModeToggle />
      </div>
      <h1 className="text-3xl font-bold mt-6">{t("welcome")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {t("description")}
      </p>
      <ProductList />
    </div>
  );
}

export default App;
