import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PinoLoggerService } from './logger/pino-logger.service';
import { AllExceptionsFilter } from './middleware/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get(PinoLoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
