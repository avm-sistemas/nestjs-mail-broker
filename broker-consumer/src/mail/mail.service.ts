import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { EmailDto } from 'src/dto/email.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mail: EmailDto) {
    const { email, subject, message } = mail;

    const result = await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: message,
    });
    this.logger.log("Mail Server response => ", result)
    return result;    
  }
}