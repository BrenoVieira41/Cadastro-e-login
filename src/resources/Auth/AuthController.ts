import { Request, Response } from 'express';
import UtilsService from '../Utils/UtilsService';
import UserRepository from '../User/UserRepository';
import AuthService from './AuthService';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userLogin = await AuthService.login(email, password);
      return res.status(200).send(userLogin);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

}

export default new AuthController();
