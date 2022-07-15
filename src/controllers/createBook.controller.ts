import { Response, Request } from "express";
import { createBookService } from "../services/createBook.service";



class CreateBookController {
  
  async handle(req: Request, res: Response) {
    const { author, genre, title } = req.body;

    try {
      const newBook = await createBookService.execute({ author,genre,title });

      return res.status(201).json(newBook);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

const createBookcontroller = new CreateBookController()

export {createBookcontroller}