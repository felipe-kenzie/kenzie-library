import { prisma } from "../database/prismaClient"



export class ListBooksService {
    async execute() {
        const books = await prisma.book.findMany()

        return books
    }
}

const listbooksService = new ListBooksService()

export {listbooksService}