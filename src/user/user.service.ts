import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos/createUser.dto';

import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
