import { AppDataSource } from '../../typeorm/data-source';
import { Users } from '../../typeorm/entity/User';
import { NotRepeatInterface } from './UserIterface';

class UserRepository {
  private repository = AppDataSource.getRepository(Users);

  public async createUser(user: Users): Promise<Users> {
    return this.repository.save(user)
    .catch((error) => {
      throw new Error(error);
    });
  }

  public async updateUser(userId: string, data: any): Promise<Users> {
    const action = await this.repository.update(userId, data);
    if (action.affected > 0) {
      return this.repository.findOne({ where: { id: userId } });
    } else {
      throw new Error('Falha ao alterar usuário.');
    }
  }

  public async deleteUser(id: string): Promise<any> {
    return await this.repository.update(id, {
      deletedAt: new Date()
    }).catch((error) => {
      throw new Error(error);
    });
  }

  public async getUserById(id: string): Promise<Users> {
    return this.repository.findOne({ where: { id } })
    .catch((error) => {
      throw new Error(error);
    });
  }

  public async findUser(limit: number, offset: number): Promise<Users[]> {
    return this.repository.find({
      take: limit,
      skip: offset
    }).catch((error) => {
      throw new Error(error);
    });
  }

  public async getUserByEmail(email: string): Promise<Users> {
    return this.repository.findOne({ where: { email }, select: ['id', 'name', 'email', 'password'] })
    .catch((error) => {
      throw new Error(error);
    });
  }

  public async noRepeat(data: NotRepeatInterface): Promise<Users> {
    try {
      return this.repository.findOne({
        withDeleted: false,
        where: [
          {
            email: data.email,
          },{
            phone: data.phone,
          }
        ],
      });
    } catch (error) {
      throw new Error(`Falha ao encontrar usuário.`);
    }
  }
}

export default UserRepository;
