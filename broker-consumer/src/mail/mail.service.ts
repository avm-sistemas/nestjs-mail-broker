import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDto } from 'src/dto/email.dto';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mail: EmailDto) {
    const { email, subject, message } = mail;

    const result = await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: message,
    });

    console.log("Mail Server response => ", result);

    return result;    
  }
}