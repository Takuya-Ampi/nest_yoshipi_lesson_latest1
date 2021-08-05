import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  async create(user: CreateUserDto) {
    // console.log('user', user)
    const createdUser = new this.userModel({
      username: user.username,
      password: user.password
    })
    return await createdUser.save()
  }
  async findAll() {
    return await this.userModel.find().exec()
  }
  async findOne(username) {
    // console.log('findOne username', username)
    const user = await this.userModel.findOne({ username }).exec()
    if (!user) throw new NotFoundException('user not found')

    // update処理
    // user.username = 'aaaaa'
    // user.save()

    // delete処理
    // await this.userModel.deleteOne({ username }).exec()

    return user
  }
}
