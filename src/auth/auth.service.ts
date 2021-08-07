import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel('User') private readonly userModel: Model<IUser>, 
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser({ username, password }: CreateUserDto) {
    const user = await this.usersService.findOne(username)
    return true
  }

  async login(user: CreateUserDto) {
    // ユーザー名 or パスワードが間違っていたらバリデーション
    // const createdUser = await this.userModel.findOne({ username: user.username, password: user.password }).exec()
    // if (!createdUser) throw new NotFoundException('username or password is incorrect')
    if (await this.validateUser(user)) {
      const payload = { username: user.username }
      return { 'access_token': this.jwtService.sign(payload) }
    }
    // jwtトークンを返す
    
  }
}
