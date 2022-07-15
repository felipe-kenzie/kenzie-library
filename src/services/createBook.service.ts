import { prisma } from "../database/prismaClient";



interface IRequest {
    title: string;
    author: string;
    genre: string;
  }

class CreateBookService {
  
    async execute({author,genre,title }: IRequest){
      const bookAlreadyExists = await prisma.book.findFirst({
        where: {
          title: {
            equals: title,
            mode: "insensitive"
          },
          author: {
            equals: author,
            mode: "insensitive"
          }   
        },   
      });
  
      if (bookAlreadyExists) {
        throw new Error("Book already exists!");
      }
  
      const newBook = await prisma.book.create({
        data: {
            author,
            genre,
            title,
            }
        })
     return newBook
    }  
}

const createBookService = new CreateBookService()

export { createBookService }