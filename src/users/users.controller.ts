import { Controller, Post, Body, Get, Param, ParseIntPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
  // @Get(':id')
  // findOne(@Param('id', new ParseIntPipe()) id: number) {
  //   return id
  // }
  
  @Get(':id')
  @UsePipes(new ParseIntPipe())
  findOne(@Param('id') id: number) {
    return typeof id
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
