import { Request, Response } from "express";
import { listbooksService } from "../services/listBooks.service";


class ListBooksController {
 
  async handle(req: Request, res: Response)  {
    const books = await listbooksService.execute();

    return res.json(books);
  }
}

const listBookscontroller = new ListBooksController()

export {listBookscontroller}
