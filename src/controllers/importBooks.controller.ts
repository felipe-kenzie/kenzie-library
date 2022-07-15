import { Request, Response } from "express";
import { importBookService } from "../services/importBooks.service";



class ImportBooksController {
    async handle(req: Request, res: Response) {
        const {file} = req
    
        await importBookService.execute(file!)
        res.send()
    }
}


const importBooksController = new ImportBooksController()

export {importBooksController}