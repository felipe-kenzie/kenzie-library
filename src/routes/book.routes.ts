import { Router } from "express";
import { createBookcontroller } from "../controllers/createBook.controller";
import { listBookscontroller } from "../controllers/listBooks.controller";



const booksRoutes = Router();

booksRoutes.post("/", (request, response) =>
  createBookcontroller.handle(request, response)
);

booksRoutes.get("/", (request, response) =>
  listBookscontroller.handle(request, response)
);

export { booksRoutes };