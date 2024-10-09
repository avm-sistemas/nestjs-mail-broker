import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {

  const rabbitServer = process.env.RABBIT_SERVER;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://' + rabbitServer + ':5672'],
        queue: 'mail',
      },
    },
  );

  app.listen();
}
bootstrap();