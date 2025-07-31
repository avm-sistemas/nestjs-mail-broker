import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        cache: false,
        isGlobal: true
      }
    ),    
    MailModule
  ],    
})
export class AppModule {}
