import UserRepository from './UserRepository';
import UtilsService from '../../resources/Utils/UtilsService';
import { NotRepeatInterface } from './UserIterface';
import { Users } from '../../typeorm/entity/User';
import bcrypt from 'bcrypt';

class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(user: Users): Promise<Users> {
    try {
      this.userValidation(user);
      const secretPassword = await bcrypt.hash(user.password, 8);
      user.password = secretPassword;
      user.email = user.email.toLowerCase();
      await this.noRepeat(user);

      return this.userRepository.createUser(user);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async getUserById(userId: string): Promise<Users> {
    try {
      return this.userRepository.getUserById(userId);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async findUser(limit: any, offset: any): Promise<Users[]> {
    try {
      offset = offset ? Number(offset) : 0;
      limit = limit ? Number(limit) : 10;

      return this.userRepository.findUser(limit, offset);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async deleteUser(userId: string): Promise<any> {
    try {
      await this.userRepository.deleteUser(userId);
      return `Usuário deletado com sucesso.`;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async updateUser(userId: string, data): Promise<any> {
    try {

      if (data.phone || data.email) {
        await this.noRepeat(data);
      }

      if (data.name) {
        await this.validateUserName(data);
      }

      if (data.phone) {
        await this.validateTelephone(data);
      }

      if (data.email) {
        data.email = data.email.toLowerCase();
        await this.validateUserEmail(data);
      }

      if (data.bornDate) {
        await this.validateUserEmail(data);
      }

      return this.userRepository.updateUser(userId, data);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async userValidation(user) {
    const validation = await Promise.allSettled([
      this.validateUserName(user),
      this.validateUserEmail(user),
      this.validateTelephone(user),
      this.validateBornDate(user),
      this.validatePassword(user),
    ]);

    validation.map(it => {
      if (it.status === 'rejected') {
        throw new Error(it.reason);
      }
    });
  }

  private async validateUserName(user: Users) {
    if (!UtilsService.requestStringNotFound(user.name)) {
      throw new Error('Necessário passar um nome.');
    }

    if (!UtilsService.validateBetween(user.name.length, 3, 50)) {
      throw new Error('O nome não pode ter menos de 3 letras ou mais de 50.');
    }
  }

  private async validateUserEmail(user: Users) {
    if (!UtilsService.validateEmail(user.email)) {
      throw new Error('Email inválido.');
    }
  }

  private async validateTelephone(user: Users) {
    if (!UtilsService.validatePhone(user.phone)) {
      throw new Error('Número de telefone inválido.');
    }
  }

  private async validateBornDate(user: Users) {
    if (!UtilsService.validateBornDate(user.bornDate)) {
      throw new Error('É necessário possuir mais de 18 anos.');
    }
  }

  private async validatePassword(user: Users) {
    if (!UtilsService.validatePassword(user.password)) {
      throw new Error('Senha invalida.');
    }
  }

  async noRepeat(data: NotRepeatInterface) {
    const validateUser = await this.userRepository.noRepeat(data);
    if (validateUser) {
      throw new Error('Já existe um usuário com esses dados.');
    }
  }

}

export default new UserService();
