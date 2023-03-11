import Usermodel from "../models/User.js";
const BASE_URL = process.env.BASE_URL;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const usersignup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.password, salt);
  const newUser = new Usermodel({
    username: req.body.username,
    email: req.body.email,
    password: secPass,
  });
  let token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
  console.log(newUser);
  console.log(token);
  try {
    const user = await newUser.save();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Usermodel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const passcompare = await bcrypt.compare(password, user.password);
    if (!passcompare) {
      return res.status(401).json("Invalid Username or password");
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
