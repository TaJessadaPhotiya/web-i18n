import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProductForm from "./ProductForm";
import {
  FiEdit,
  FiTrash2,
  FiPlusCircle,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";

function ProductList() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "th";
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/products?lang=${lang}`);
      setProducts(res.data);
    } catch (error) {
      setError(t("error.fetching_products"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [lang]);

  const openFormModal = (product = null) => {
    setEditing(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("confirm.delete_product"))) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      setError(t("error.deleting_product"));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{t("Product List")}</h1>
        <button
          onClick={() => openFormModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FiPlusCircle className="mr-2" />
          {t("add_product")}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-600 rounded mb-4">{error}</div>
      )}

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {products.map((product) => (
          <li
            key={product.id}
            className="py-3 flex justify-between items-center"
          >
            <div>{product.name}</div>
            <div className="space-x-3">
              <button
                onClick={() => openFormModal(product)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl mx-auto rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
            <div className="absolute top-2 right-2">
              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-white hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>
            <ProductForm
              selected={editing}
              onSave={() => {
                closeModal();
                fetchProducts();
              }}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
