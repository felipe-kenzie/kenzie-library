import { Request, Response } from "express";
import {exportBooksService} from "../services/exportBooks.service";
import { resolve } from "path"


class ExportBooksController {
    async handle(req: Request, res: Response)  {
        
        const books = await exportBooksService.execute();

        const tmpfile = resolve(__dirname, "..", "..", "tmp", "books.csv")
        return res.download(tmpfile) 
      }
    }
    


const exportBooksController = new ExportBooksController()

export { exportBooksController}