import { Controller, Post, Body, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username)
  }
  
  // @Get(':id')
  // @UsePipes(new ParseIntPipe())
  // findOne(@Param('id') id: number) {
  //   return typeof id
  // }
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
