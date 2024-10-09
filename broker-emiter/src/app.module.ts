import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule
  ],    
})
export class AppModule {}
