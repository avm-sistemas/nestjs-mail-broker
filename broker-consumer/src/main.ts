import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function bootstrap() {

  let options;

  const brokerServer = process.env.BROKER_SERVER;
  const brokerEngine = process.env.BROKER_ENGINE;
  const brokerPort = process.env.BROKER_PORT;

  if (brokerEngine.length == 0) {
      throw new InternalServerErrorException('BROKER_SERVER unavailable.')
  }

  if (brokerEngine == 'rabbit') {
    this.options = 
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://' + brokerServer +':' + brokerPort],
          queue: 'mail',
        },
      };
  } else
  if (brokerEngine == 'kafka') {
    this.options =
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `consumer-${uuidv4()}`,
            brokers: [brokerServer +':' + brokerPort],
          },
          consumer: {
            groupId: 'mail',
          },
        },
      };
  } else {
      throw new InternalServerErrorException('BROKER_ENGINE unavailable.');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    options
  );

  app.listen();
}
bootstrap();