import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer.config";
import { createBookcontroller } from "../controllers/createBook.controller";
import { listBookscontroller } from "../controllers/listBooks.controller";
import {importBooksController} from "../controllers/importBooks.controller"
import { exportBooksController } from "../controllers/exportBooks.controller";


const upload = multer(multerConfig)

const booksRoutes = Router();

booksRoutes.post("/", (req, res, next) =>
  createBookcontroller.handle(req, res, next)
);

booksRoutes.get("/", (req, res) =>
  listBookscontroller.handle(req, res)
);

booksRoutes.post("/import", upload.single("file"), (req, res) => {
 importBooksController.handle(req,res)
})

booksRoutes.get("/export", (req, res) => {
 exportBooksController.handle(req, res)
})

export { booksRoutes };