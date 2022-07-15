import fs from "fs"
import {prisma} from "../database/prismaClient"
import {parse as csvParse } from "csv-parse"




interface IImportBooks {
    title: string;
    author: string;
    genre: string;
  }


class ImportBooksService {

    loadBooks(file: Express.Multer.File): Promise<IImportBooks[]> {

        return new Promise((resolse, reject) => {

            const stream = fs.createReadStream(file.path)
            const books: IImportBooks[] = []

            const parsefile = csvParse()
            stream.pipe(parsefile)

            parsefile.
            on("data", async line => {
                const [title, author, genre] = line
                books.push({
                    title,
                    author,
                    genre,
                })
            })
            .on("end", () => {
                fs.promises.unlink(file.path)
                resolse(books)
            })
            .on("error", error => {
                reject(error)
            })
        })
    }


    async execute(file: Express.Multer.File) {

        const books = await this.loadBooks(file)
        
        books.map( async book => {
            const { title, author, genre} = book

            const existsBook = await prisma.book.findFirst({
                where: {
                    title: {
                        equals: title,
                        mode: "insensitive"
                    },
                    author: {
                        equals: author,
                        mode: "insensitive"
                    }
                }
            })

            if(!existsBook) {
                await prisma.book.create({
                    data: {
                        title,
                        author,
                        genre,
                    }
                })
            }
        })
    }

}

const importBookService = new ImportBooksService()

export {importBookService}