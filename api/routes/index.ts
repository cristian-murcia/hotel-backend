import { Router } from "express";
import { UsuarioController } from "../controller";
import { HomeController } from "../controller/home.controller";

const router = Router();
const homeController = new HomeController();
const usuarioController = new UsuarioController();

//Rutas
// Uso pocas rutas ya que suelo enviar un token para la misma petició
//  y separarlas por el numero de proceso contenido en ellos

router.post('/envio', homeController.envio);
//router.post('encode', homeController.encode);
//router.post('decode', homeController.decode);

export default router;