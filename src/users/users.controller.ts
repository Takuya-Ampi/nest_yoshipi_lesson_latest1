import { Controller, Post, Body, Get, Param, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('username') username: string, @Request() req: any) {
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
