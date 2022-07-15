import fs from "fs"
import {prisma} from "../database/prismaClient"
import {stringify} from "csv-stringify"


class ExportBooksService {
    async execute() {
        
        const books = await prisma.book.findMany({
            select: {
                title: true,
                author: true,
                genre: true,
            }
        })

        const whiteStream = fs.createWriteStream("tmp/books.csv")
        const stringifier = stringify({header: true, columns: ["title", "author", "genre"]})

        books.map( book => {
            stringifier.write(Object.values(book))
        })

        stringifier.pipe(whiteStream)
    }
} 

const exportBooksService = new ExportBooksService()


export { exportBooksService}

