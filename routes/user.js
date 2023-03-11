import express from "express";
import FetchUser from "../Middleware/verifyToken.js";
import Usermodel from "../models/User.js";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
const router = express.Router();

//UPDATE
router.put("/:id", FetchUser, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = secPass;
  }

  try {
    const updatedUser = await Usermodel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
    console.log("User successfully updated!");
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
// router.delete("/:id", FetchUser, (req, res) => {
//   const user = Usermodel(req.params.id);
//   const newUser = user.filter((user) => {
//     user.id != user;
//   });
// });
//GET

router.get("/find/:id", FetchUser, async (req, res) => {
  try {
    const user = await Usermodel.findOne({ user: req.params.id });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occured");
  }
});

//GET ALL
router.get("/fetchAll", FetchUser, async (req, res) => {
  try {
    const user = await Usermodel.find({ user: req.params.id });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error occured");
  }
});

export default router;
