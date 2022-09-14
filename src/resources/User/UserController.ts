import { Request, Response } from 'express';
import { Users } from '../../typeorm/entity/User';
import UtilsService from '../Utils/UtilsService';
import UserService from './UserService';

class UserController {
  async userIndex(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const user = await UserService.getUserById(id);
      return res.status(200).send(user);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user: Users = req.body;

      const newUser = await UserService.createUser(user);
      return res.status(200).send(newUser);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const user = req.body;
      const newUser = await UserService.updateUser(id, user);
      return res.status(200).send(newUser);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(id);
      return res.status(200).send(user);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    try {
      const { limit, offset } = req.query;

      const user = await UserService.findUser(limit, offset);
      return res.status(200).send(user);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const deleteUser = await UserService.deleteUser(id);
      return res.status(200).send(deleteUser);
    } catch (err) {
      const error = UtilsService.appError(err);
      return res.status(error.statusCode).send(error.message);
    }
  }
}

export default new UserController();
