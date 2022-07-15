import express from "express";
import { booksRoutes } from "./routes/book.routes";


const app = express();

app.use(express.json());
app.use("/books", booksRoutes);

export { app };
