import { Response, Request, NextFunction } from "express";
import { createBookService } from "../services/createBook.service";



class CreateBookController {
  
  async handle(req: Request, res: Response, next: NextFunction) {
    const {  title, author, genre } = req.body;

    try {
      const newBook = await createBookService.execute({ title, author, genre });

      return res.status(201).json(newBook);
    } catch (error) {
      next(error)
    }
  }
}

const createBookcontroller = new CreateBookController()

export {createBookcontroller}