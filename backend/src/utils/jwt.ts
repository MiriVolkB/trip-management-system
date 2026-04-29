import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function generateToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
      class: user.class,
    },
    SECRET,
    { expiresIn: "1d" }
  );
}