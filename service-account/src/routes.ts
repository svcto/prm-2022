import { Router } from "express";
import AuthController from "./controller/AuthController";

// instancio o router do express
const routes = Router();

//rotas da Brand
routes.post('/admin/signin', AuthController.signInAdmin)


export default routes;