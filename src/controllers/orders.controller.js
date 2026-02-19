import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getOrders:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrdById = async (req, res) => {
  const { id } = req.params; // ✅ FIX

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrdById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
