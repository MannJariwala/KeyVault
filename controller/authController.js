import db from "../connect.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function handleSignUp(req, res) {
  const { email, password } = req.body;

  const hashed = await hash(password, 10);

  const [result] = await db.execute(
    "insert into users(email,master_password_hash,two_factor_secret,created_at,updated_at) values(?,?,?,NOW(),NOW())",
    [email, hashed, ""]
  );

  if (result.affectedRows > 0) return res.redirect("/login");
}

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  const [rows] = await db.execute(
    `select * from users where email = '${email}'`
  );
  if (rows.affectedRows < 0)
    return res.send(403).json({ message: "Access Forbidden" });

  const isMatch = await bcrypt.compare(password, rows[0].master_password_hash);
  if (!isMatch) return res.json({ error: "Invaild Credentials" });

  const token = jwt.sign({ data: rows[0] }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
}

export async function handleOnLoadDashboard(req, res) {
  const [rows] = await db.execute(
    `select * from api_keys where user_id = ${req.user.data.id}`
  );

  res.render("dashboard", {
    user: req.user,
    apikeys: rows,
  });
}

export async function handleLogout(req, res) {
  res.clearCookie("token", { httpOnly: true });
  res.redirect("/login");
}
