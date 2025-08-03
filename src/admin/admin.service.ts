import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedirectEntity } from 'src/entities/redirect.entity';
import { Repository } from 'typeorm';
import { join } from 'path';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(RedirectEntity)
    private redirectRepo: Repository<RedirectEntity>,
  ) {}

  async getAllRedirects() {
    return await this.redirectRepo.find();
  }

  async saveRedirect(redirect: RedirectEntity) {
    redirect.path = this.getStanderizedPath(redirect.path);
    redirect.redirectTo = this.getStanderizedRedirectToLink(
      redirect.redirectTo,
    );
    return await this.redirectRepo.save(redirect);
  }

  async editRedirect(id: number, editRedirect: RedirectEntity) {
    const redirect = await this.redirectRepo.findOne({
      where: {
        id,
      },
    });

    if (redirect === null) {
      throw new HttpException('Redirect not found', HttpStatus.NOT_FOUND);
    }

    redirect.path = this.getStanderizedPath(editRedirect.path);
    redirect.redirectTo = this.getStanderizedRedirectToLink(
      editRedirect.redirectTo,
    );
    return await this.redirectRepo.save(redirect);
  }

  async deleteRedirect(id: number) {
    return await this.redirectRepo.delete(id);
  }

  getStanderizedRedirectToLink(redirectTo: string) {
    if (redirectTo.startsWith('https://')) redirectTo = redirectTo.slice(8);
    if (redirectTo.startsWith('http://')) redirectTo = redirectTo.slice(7);
    return redirectTo;
  }

  getStanderizedPath(oldpath: string) {
    let path = join(oldpath).replaceAll('\\', '/');
    if (path.startsWith('/')) path = path.slice(1);
    if (path.endsWith('/')) path = path.slice(0, -1);
    if (path.startsWith('__redirectMe/')) path = path.slice(13);
    return path;
  }
}
