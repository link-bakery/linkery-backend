import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(password: string) {
    const user = await this.userRepo.findOne({
      where: {
        username: 'admin',
      },
    });

    if (!user || !bcrypt.compareSync(password, user?.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changepw(oldpassword: string, newpassword: string) {
    const user = await this.userRepo.findOne({
      where: {
        username: 'admin',
      },
    });

    if (!user || !bcrypt.compareSync(oldpassword, user?.password)) {
      throw new UnauthorizedException();
    }

    user.password = bcrypt.hashSync(newpassword, 10);

    await this.userRepo.save(user);

    return {
      message: 'Sucessfully changed!',
    };
  }
}
