
import {Request } from "express";
import {resolve} from "path"
import multer, {FileFilterCallback} from "multer";
import crypto from "crypto"



const tmpFolder = resolve(__dirname, "..", "..", "tmp")

const fileSize = 1 * 1024 * 1024

export default {
    tmpFolder,

    fileFilter: (
        request: Request,
        file: Express.Multer.File,
        callback: FileFilterCallback
    ) => {
        const acceptedTypes = file.mimetype

        if(acceptedTypes === "text/csv"){
            callback(null, true)        }
        else {
            callback(null, false)
            callback(new Error("Only csv format allowed"))
        }
    },

    limits: {
        fileSize,
    },
    
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(8).toString("hex")
            const filename = `${fileHash}-${file.originalname}`

            return callback(null, filename)
        }
    })
}
