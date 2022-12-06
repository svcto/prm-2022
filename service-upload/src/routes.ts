import { Router } from "express";
import UploadController from "./controller/UploadController";

const multer = require('multer');

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
})

const routes = Router();

routes.post("/upload", Multer.single("imagem"), UploadController.doUpload)

export default routes;