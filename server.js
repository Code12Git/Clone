import express from "express";
import connection from "./db/conn.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import Router from "./routes/auth.js";
import router from "./routes/user.js";
const app = express();

dotenv.config();

const port = process.env.PORT || 8500;
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", Router);
app.use("/api/users", router);
connection();

app.get("/", (req, res) => {
  res.status(200).send("Working!");
});

app.listen(port, () => {
  console.log(`Server is up on PORT : ${port}`);
});
