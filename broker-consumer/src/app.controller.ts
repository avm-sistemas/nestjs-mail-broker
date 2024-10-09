import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailDto } from './dto/email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('mail_queue')
  handleMail(@Payload() email: EmailDto) {
    return this.appService.handleMail(email);
  }
}