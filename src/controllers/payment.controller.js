import axios from "axios";
import Order from "../models/order.model.js";

const ZARINPAL_REQUEST_URL =
  "https://sandbox.zarinpal.com/pg/v4/payment/request.json";
const ZARINPAL_GATEWAY = "https://sandbox.zarinpal.com/pg/StartPay/";
export const initiatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ message: "OrderId is required" });
    }
    const order = await Order.findById(orderId);
    if (!order || order.status !== "pending_payment") {
      return res.status(400).json({ message: "Order is not awaiting payment" });
    }
    const { title, type, month, year, country } = order.productSnapshot;
    const description = `ثبت سفارش برای ${title} — ${type}، ${month}/${year}، ${country}`;

    const payload = {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: order.totalPrice,
      currency: "IRT",
      description,
      callback_url: process.env.ZARINPAL_CALLBACK_URL,
      metadata: {
        mobile: order.customer.phone,
      },
    };
    const { data } = await axios.post(ZARINPAL_REQUEST_URL, payload);

    if (data?.data?.code !== 100) {
      return res
        .status(502)
        .json({ message: "Zarinpal request failed", error: data.errors });
    }
    const authority = data.data.authority;
    order.payment = {
      gateway: "zarinpal",
      authority,
      requestedAt: new Date(),
    };

    await order.save();
    return res
      .status(200)
      .json({ paymentUrl: `${ZARINPAL_GATEWAY}${authority}` });
  } catch (error) {
    console.error("Zarinpal error:", error.response?.data);
    console.error("initiatePayment error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const ZARINPAL_VERIFY_URL =
  "https://sandbox.zarinpal.com/pg/v4/payment/verify.json";

export const verifyPayment = async (req, res) => {
  const { Authority, Status } = req.query;

  // User cancelled payment at gateway

  if (Status !== "OK") {
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/failed?reason=cancelled`,
    );
  }
  if (!Authority) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/failed?reason=invalid_authority`,
    );
  }

  try {
    // Find the order by authority code saved during initiation
    const order = await Order.findOne({ "payment.authority": Authority });

    if (!order) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment/failed?reason=not_found`,
      );
    }

    // Prevent double-verification
    if (order.status === "paid") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment/success?refId=${order.payment.refId}&orderCode=${order.orderCode}`,
      );
    }

    // Recalculate total server-side (same logic as initiate)
    const unitPrice = order.productSnapshot.price;
    const optionsTotal = (order.selectedOptionsSnapshot || []).reduce(
      (sum, opt) => sum + (opt.price || 0),
      0,
    );

    // Verify with Zarinpal
    const { data } = await axios.post(
      ZARINPAL_VERIFY_URL,
      {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: order.totalPrice,
        authority: Authority,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const { code, ref_id } = data.data;

    // Zarinpal success codes: 100 = new, 101 = already verified
    if (code === 100 || code === 101) {
      order.status = "paid";
      order.payment.refId = String(ref_id);

      await order.save();

      return res.redirect(
        `${process.env.FRONTEND_URL}/payment/success?refId=${ref_id}&orderCode=${order.orderCode}`,
      );
    }

    // Zarinpal returned a failure code
    console.error("Zarinpal verify failed, code:", code);
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/failed?reason=gateway_error&code=${code}`,
    );
  } catch (err) {
    console.error(
      "Verify controller error:",
      err.response?.data || err.message,
    );
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/failed?reason=server_error`,
    );
  }
};
