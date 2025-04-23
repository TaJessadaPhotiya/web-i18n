const { Product, ProductTranslation } = require("../models");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const { translations } = req.body;

    const product = await Product.create();

    for (const t of translations) {
      await ProductTranslation.create({
        product_id: product.id,
        lang: t.lang,
        name: t.name,
        description: t.description,
      });
    }

    res.json({ message: "Product created", product_id: product.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getProductsByLang = async (req, res) => {
  const { lang = "th" } = req.query;

  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductTranslation,
          as: "translations",
          where: { lang: [lang, "th"] },
        },
      ],
    });

    const result = products.map((p) => {
      const t =
        p.translations.find((t) => t.lang === lang) ||
        p.translations.find((t) => t.lang === "th");
      return {
        id: p.id,
        name: t?.name,
        description: t?.description,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { translations } = req.body;

  try {
    for (const t of translations) {
      const [updated] = await ProductTranslation.update(
        {
          name: t.name,
          description: t.description,
        },
        {
          where: {
            product_id: id,
            lang: t.lang,
          },
        }
      );

      if (!updated) {
        await ProductTranslation.create({
          product_id: id,
          lang: t.lang,
          name: t.name,
          description: t.description,
        });
      }
    }

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await ProductTranslation.destroy({ where: { product_id: id } });
    await Product.destroy({ where: { id } });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
