import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EmailDto } from 'src/dto/email.dto';

@Injectable()
export class MailService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    const brokerEngine = this.configService.get<string>('BROKER_ENGINE');
    const brokerServer = this.configService.get<string>('BROKER_SERVER');
    const brokerPort = this.configService.get<string>('BROKER_PORT');

    if (brokerEngine.length == 0) {
        throw new InternalServerErrorException('BROKER_SERVER unavailable.')
    }

    if (brokerEngine == 'rabbit') {
        this.client = ClientProxyFactory.create(
            {
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://'+ brokerServer +':' + brokerPort],
                    queue: 'mail'
                },
            }
        );
    } else
    if (brokerEngine == 'kafka') {
        this.client = ClientProxyFactory.create(
            {        
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'app-gateway',
                        brokers: [ brokerServer + ':' + brokerPort],
                    },
                    consumer: {
                        groupId: 'kafka-mail',
                    },
                },
            }
        );
    } else {
        throw new InternalServerErrorException('BROKER_ENGINE unavailable.');
    }
  }

  async sendEmail(email: EmailDto) {
    return await this.client
      .emit('mail_queue', email)
      .toPromise();
  }
}