import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { MediaModule } from './modules/media/media.module';
import { AuthModule } from './modules/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { getBullConfig } from './config/bullmq';
import { HealthCheckModule } from './modules/heath-check/health-check.module';

@Module({
  imports: [
    AuthModule,
    MediaModule,
    HealthCheckModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    BullModule.forRoot(getBullConfig()),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = configService.get('typeorm');
        if (!options) {
          throw new Error('TypeOrm configuration is not defined');
        }
        return options;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
