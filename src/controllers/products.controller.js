import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProducts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductBySlug = async (req, res) => {
  const { slug } = req.params; // ✅ FIX

  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
