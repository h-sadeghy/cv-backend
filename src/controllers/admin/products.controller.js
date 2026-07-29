import Product from "../../models/product.model.js";
import { generateBaseSlug } from "../../utils/slugGenerate.js";

// Public - Get all open orders
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({ products, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// Public - Get single by slug
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Admin - Create
export const createProduct = async (req, res) => {
  const {
    title,
    description,
    type,
    status,
    month,
    year,
    country,
    keywords,
    tags,
    price,
  } = req.body;

  try {
    if (
      !title ||
      !description ||
      !status ||
      !type ||
      !month ||
      !year ||
      !country ||
      !price
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const baseSlug = generateBaseSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const countryCode = country.toLowerCase();
    const flagUrl = `/static/flags/${countryCode}.jpg`;
    const newProduct = {
      title,
      description,
      status,
      year,
      month,
      type,
      country,
      keywords,
      image: flagUrl,
      tags,
      slug,
      price,
    };
    const product = await Product.create(newProduct);

    res.status(201).json({
      product,
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", success: false });
  }
};

// Admin - Update
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    type,
    month,
    year,
    country,
    keywords,
    tags,
    price,
    slug,
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const keywordsArray = Array.isArray(keywords) ? keywords : [];
    const tagsArray = Array.isArray(tags) ? tags : [];

    if (keywordsArray.length === 0 || tagsArray.length === 0) {
      return res.status(400).json({
        message: "at least  one tag and one keyword is",
        success: false,
      });
    }

    if (country !== product.country) {
      const countryCode = country.toLowerCase().trim();
      product.image = `/static/flags/${countryCode}.jpg`;
    }
    if (title !== product.title) {
      const baseSlug = generateBaseSlug(title);
      let slug = baseSlug;
      let counter = 1;

      while (await Product.findOne({ slug })) {
        slug = `${baseSlug}-${counter++}`;
      }

      product.slug = slug;
    }
    product.title = title;
    product.description = description;
    product.status = status;
    product.type = type;
    product.year = parseInt(year);
    product.month = parseInt(month);
    product.country = country;
    product.keywords = keywordsArray;
    product.tags = tagsArray;
    if (price !== undefined) product.price = price;

    const updatedProduct = await product.save();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product successfully updated",
      success: true,
      product: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      success: false,
      error: error.message,
    });
  }
};

// Admin - Delete
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
