import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  import { PinoLoggerService } from '../logger/pino-logger.service';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
      private readonly httpAdapterHost: HttpAdapterHost,
      private readonly logger: PinoLoggerService,
    ) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message: exception instanceof Error ? exception.message : 'Internal server error',
      };
  
      // Log the error
      this.logger.error(
        `${responseBody.message}`,
        exception instanceof Error ? exception.stack : undefined,
        'UnhandledException'
      );
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }