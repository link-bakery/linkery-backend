import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedirectEntity } from './entities/redirect.entity';
import { UserEntity } from './entities/user.entity';
import { RequestLogEntity } from './entities/requestlog.entity';
import { AdminModule } from './admin/admin.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('database.host') || 'localhost',
          port: 5432,
          username: config.get('database.user'),
          password: config.get('database.password'),
          database: config.get('database.name'),
          entities: [RedirectEntity, UserEntity, RequestLogEntity],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([RedirectEntity, UserEntity, RequestLogEntity]),
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
