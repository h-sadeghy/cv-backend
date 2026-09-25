import { isValidObjectId } from "mongoose";
import Order from "../../models/order.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const [orders, totalItems] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),
      Order.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalItems / limitNumber);

    res.json({
      orders,
      page: pageNumber,
      totalPages,
      totalItems,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID or formant" });
    }
    const order = await Order.findById(id).select("-__v");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch order" });
  }
};
export const updateOrder = (req, res) => {};
export const deleteOrder = (req, res) => {};
