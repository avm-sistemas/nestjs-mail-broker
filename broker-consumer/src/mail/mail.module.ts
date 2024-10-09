import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SERVER,
        port: 1025,
        secure: false,
        auth: {
          user: 'your_username',
          pass: 'your_password',
        },
      },
    })
  ],
  providers: [MailService]
})
export class MailModule {}
