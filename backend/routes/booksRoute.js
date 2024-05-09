import express from "express";

import { Book } from "../models/bookModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(401).send({
        message: `${id} doesn't exist`,
      });
    }
    return res.status(200).send(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

//create new book record
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

//Update books
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).json({
        message: `Book not found`,
      });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

//Delete a book
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Book not found`,
      });
    }
    const books = Book.find({});
    return res.status(200).send({
      count: books.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
