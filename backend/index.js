import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

//Middleware for parsing request body
app.use(express.json());

// app.use(cors);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", booksRoute);
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to BookStore");
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
