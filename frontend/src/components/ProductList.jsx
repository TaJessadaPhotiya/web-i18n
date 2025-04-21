import React from "react";
import { useTranslation } from "react-i18next";

const ProductList = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "th";

  console.log("currentLang", currentLang);

  const products = [
    {
      id: 1,
      name: {
        th: "ข้าวผัด",
        en: "Fried Rice",
        zh: "炒饭",
        ja: "チャーハン",
      },
      description: {
        th: "อร่อยเด็ด",
        en: "Delicious fried rice",
        zh: "美味的炒饭",
        ja: "美味しいチャーハン",
      },
    },
    {
      id: 2,
      name: {
        th: "ต้มยำกุ้ง",
        en: "Tom Yum Goong",
        zh: "冬阴功",
        ja: "トムヤムクン",
      },
      description: {
        th: "เผ็ดจี๊ดจ๊าด",
        en: "Spicy shrimp soup",
        zh: "辣虾汤",
        ja: "辛いエビスープ",
      },
    },
  ];

  return (
    <div className="mt-6 space-y-4">
      {products.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{item.name[currentLang]}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {item.description[currentLang]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;



