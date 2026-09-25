import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { SERVICE_OPTIONS } from "../constants/serviceOptions.js";
export const getOrder = (req, res) => {};
export const createOrder = async (req, res) => {
  try {
    const { productId, selectedOptions, customer } = req.body;

    const { fullName, phone, province, city, postalCode, address } =
      customer ?? {};
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !province.trim() ||
      !city.trim() ||
      !postalCode.trim() ||
      !address.trim()
    ) {
      return res
        .status(400)
        .json({ message: "customer fields are incomplete" });
    }

    if (!/^09\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "phone is not valid" });
    }
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "product not found" });
    }

    const resolvedOptions = [];
    for (const id of selectedOptions) {
      const option = SERVICE_OPTIONS.find((o) => o.id === id);
      if (!option) {
        return res.status(400).json({ message: `گزینه نامعتبر: ${id}` });
      }
      resolvedOptions.push(option);
    }

    const optionsTotal = resolvedOptions.reduce((sum, o) => sum + o.price, 0);
    const quantity = 1;
    const totalPrice = (productExists.price + optionsTotal) * quantity;
    const unitPrice = productExists.price;

    const order = await Order.create({
      product: productExists._id,
      productSnapshot: {
        title: productExists.title,
        price: productExists.price,
        type: productExists.type,
        year: productExists.year,
        month: productExists.month,
        country: productExists.country,
        slug: productExists.slug,
      },
      selectedOptionsSnapshot: resolvedOptions,
      quantity,
      unitPrice,
      totalPrice,
      customer,
      status: "pending_payment",
    });

    return res.status(201).json({ orderId: order._id, totalPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in CreateOrder Controller" });
  }
};
export const verifyOrder = (req, res) => {};
