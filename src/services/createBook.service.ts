import { prisma } from "../database/prismaClient";
import AppError from "../errors/appError";



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
        throw new AppError("Book already exists!", 400);
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