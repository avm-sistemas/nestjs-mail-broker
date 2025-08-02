import { NestFactory } from '@nestjs/core';
import { InternalServerErrorException } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function bootstrap() {

  let options = {

  };

  const brokerServer = process.env.BROKER_SERVER;
  const brokerEngine = process.env.BROKER_ENGINE;
  const brokerPort = process.env.BROKER_PORT;

  // Added checks for undefined process.env variables, as they can be undefined if not set.
  if (!brokerEngine || brokerEngine.length === 0) { // Check if undefined or empty
      throw new InternalServerErrorException('BROKER_ENGINE unavailable.'); // Changed from BROKER_SERVER for accuracy
  }
  if (!brokerServer || brokerServer.length === 0) {
      throw new InternalServerErrorException('BROKER_SERVER unavailable.');
  }
  if (!brokerPort || brokerPort.length === 0) {
      throw new InternalServerErrorException('BROKER_PORT unavailable.');
  }

  if (brokerEngine == 'rabbit') {
    options = {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://' + brokerServer +':' + brokerPort],
          queue: 'mail',
        },
      };
  } else
  if (brokerEngine == 'kafka') {
    options = {
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
      throw new InternalServerErrorException('BROKER_ENGINE unavailable or unsupported.');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    options
  );

  app.listen();
}
bootstrap();