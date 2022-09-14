import { Router } from "express";
import AuthController from "./AuthController";

const routes = Router();

routes.post('/auth/login', AuthController.login);

export default routes;
