import { Router } from "express";
import { createBookcontroller } from "../controllers/createBook.controller";
import { listBookscontroller } from "../controllers/listBooks.controller";



const booksRoutes = Router();

booksRoutes.post("/", (req, res, next) =>
  createBookcontroller.handle(req, res, next)
);

booksRoutes.get("/", (req, res) =>
  listBookscontroller.handle(req, res)
);

export { booksRoutes };