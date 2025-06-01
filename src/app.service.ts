import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { Repository } from 'typeorm';
import { RedirectEntity } from './entities/redirect.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestLogEntity } from './entities/requestlog.entity';
import { AdminService } from './admin/admin.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(RedirectEntity)
    private redirectRepo: Repository<RedirectEntity>,
    @InjectRepository(RequestLogEntity)
    private requestLogRepo: Repository<RequestLogEntity>,
    private adminService: AdminService,
  ) {}

  private logger = new Logger(AppService.name);

  async redirect(requestPath: string) {
    const path = this.adminService.getStanderizedPath(requestPath);

    const requestLog: RequestLogEntity = {
      id: 0,
      path,
      successfullyRedirected: false,
      requestedAt: new Date(),
    };

    const redirection = await this.redirectRepo.findOne({
      where: {
        path,
      },
    });

    if (!redirection) {
      await this.requestLogRepo.save(requestLog);
      this.logger.warn(`Redirect failed! Path: '${path}'`);
      return;
    }

    requestLog.successfullyRedirected = true;
    await this.requestLogRepo.save(requestLog);

    this.logger.log(
      `Redirect successfull! Path: '${path}', RedirectTo: '${redirection.redirectTo}'`,
    );

    return {
      url: 'https://' + redirection.redirectTo,
    };
  }
}
