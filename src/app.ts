import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import { booksRoutes } from "./routes/book.routes";


const app = express();

app.use(express.json());
app.use("/books", booksRoutes);
app.use(errorHandler)

export { app };

