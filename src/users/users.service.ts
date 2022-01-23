import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { bcryptSaltRounds } from '../auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
) { }

  async createUser(createUserDto: CreateUserDto) {
    const hashpassword = await this.encrypt(createUserDto.password);
    return await this.usersRepository.save({
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashpassword
    })
  }

  findAll() {
    return this.usersRepository.find({ select: ["firstname", "lastname", "email", "role"] });
  }

  async encrypt(password: string): Promise<any>  {
    return await bcrypt.hash(password, bcryptSaltRounds);
  }

  async hashCompare(reqPass, dbPass) {
    return await bcrypt.compare(reqPass, dbPass);
  }
  
  async findUser(query:any) {
    return this.usersRepository.findOne(query);
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async findEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async update(id:string, updateUserDto: UpdateUserDto) {
    let user : any = {}
    if (!!updateUserDto.password) {
      const hashpassword = await this.encrypt(updateUserDto.password);
      user.password = hashpassword
    }
      return await this.usersRepository.update(id,{
        ...updateUserDto, ...user
      })
  }

  remove(id: string) {
      return this.usersRepository.delete(id);
  }

}
