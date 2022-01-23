import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(user: any) {
    const userDB:any = await this.usersService.findUser({email:user.email})
    if (!!userDB) {
      const payload = { email: user.email, id: userDB.id, role: userDB.role };
      if(await this.usersService.hashCompare(user.password, userDB.password) === false) {
        return {message: "Not logged", error: true}
      }
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return {message:"That user has never been registered", error: true}
  }
}