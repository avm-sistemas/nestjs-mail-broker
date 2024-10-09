import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EmailDto } from 'src/dto/email.dto';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  private rabbitServer: string = process.env.RABBIT_SERVER;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://'+ this.rabbitServer +':5672'],
        queue: 'mail'
      },
    });
  }

  async sendEmail(email: EmailDto) {
    return await this.client
      .emit('mail_queue', email)
      .toPromise();
  }
}