import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser } from '../api/types/dto';
import { Usertyp } from '../domains/usertyp.entity';

@Injectable()
export class UserSqlTypeormRepository {
  constructor(
    @InjectRepository(Usertyp)
    private readonly usertypRepository: Repository<Usertyp>,
  ) {}

  /* 
   async findAllUsers() {
     return this.usertypRepository.find();
   }
 
   async findById(userId: string) {
     return this.usertypRepository.find({ id: userId });
   }
 
   async deleteById(userId: string) {
     return this.usertypRepository.delete({ id: userId });
   }*/

  async createNewUser(newUser: CreateUser) {
    const user = new Usertyp();
    user.createdAt = newUser.createdAt;
    user.expirationDate = newUser.expirationDate;
    user.email = newUser.email;
    user.login = newUser.login;
    user.confirmationCode = newUser.confirmationCode;
    user.isConfirmed = newUser.isConfirmed;
    user.passwordHash = newUser.passwordHash;
    const result = await this.usertypRepository.save(user);
    return result;
  }
}
