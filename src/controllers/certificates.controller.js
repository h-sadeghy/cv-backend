import Certificate from "../models/certificate.model.js";

export const getCerts = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json(certs);
  } catch (error) {
    console.error("Error in getCerts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCertById = async (req, res) => {
  const { slug } = req.params;

  try {
    const cert = await Certificate.findOne({ slug });

    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json(cert);
  } catch (error) {
    console.error("Error in getCertById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
