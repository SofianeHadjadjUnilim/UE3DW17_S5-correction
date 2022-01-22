import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createuser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll() {
    return this.usersService.findAll().catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findOne(@Param('id') id: string) {
      return this.usersService.findOne(id).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  // @UseGuards(JwtAuthGuard)
  @Put('updateuser')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('deleteuser')
  remove(@Body('id') id: string) {
    return this.usersService.remove(id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
