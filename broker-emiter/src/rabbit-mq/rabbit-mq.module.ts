import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';
import { RabbitMQController } from './rabbit-mq.controller';

@Module({
  providers: [RabbitMQService],
  controllers: [RabbitMQController]
})
export class RabbitMQModule {}
