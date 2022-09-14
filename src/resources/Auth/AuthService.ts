import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../User/UserRepository';
import jwt from 'jsonwebtoken';


class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(email: string, password: string) {
    try {

      const user = await this.userRepository.getUserByEmail(email);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Usuário ou senha inválido');
      }

      Reflect.deleteProperty(user, 'password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
      return { user, token };

    } catch(err) {
      throw new Error(err);
    }
  }
}

export default new UserService();
