import Admin from "../../models/admin.model.js";
import { signToken } from "../../utils/jwt.js";
import bcrypt from "bcryptjs";
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) return res.status(401).json({ message: "Invalid   credentials" });
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({
    id: admin._id,
    role: admin.role,
    email: admin.email,
    name: admin.name,
  });

  res.json({
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      role: admin.role,
    },
  });
};
