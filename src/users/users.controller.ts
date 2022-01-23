import { Controller, Get, Post, Body, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/jwt/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/guards/roles.guard';
import { UsersGuard } from './guards/users.guard';
import { DecoRoles } from 'src/auth/roles/decorators/roles.decorator';
import { Roles } from 'src/auth/roles/models/roles.enum';

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

  @UseGuards(JwtGuard, RolesGuard)
  @DecoRoles(Roles.ADMIN, Roles.USER)
  @Get('users')
  findAll() {
    return this.usersService.findAll().catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  // GET USER BY ID WITH PARAM
  // @UseGuards(JwtGuard, UsersGuard)
  // @DecoRoles(Roles.ADMIN)
  // @Get('user/:id')
  // findOne(@Param('id') id: string) {
  //     return this.usersService.findOne(id).catch(err => {
  //       throw new HttpException({
  //         message: err.message
  //       }, HttpStatus.INTERNAL_SERVER_ERROR);
  //     });
  // }

  @UseGuards(JwtGuard, UsersGuard)
  @DecoRoles(Roles.ADMIN)
  @Get('user')
  findOne(@Body('id') id: string) {
      return this.usersService.findOne(id).catch(err => {
        throw new HttpException({
          message: err.message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  @UseGuards(JwtGuard, UsersGuard)
  @DecoRoles(Roles.ADMIN)
  @Put('updateuser')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @DecoRoles(Roles.ADMIN)
  @Delete('deleteuser')
  remove(@Body('id') id: string) {
    return this.usersService.remove(id).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
