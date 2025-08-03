import { Injectable } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { MailService } from './mail/mail.service';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class AppService {

  constructor(private mailService: MailService) {}

  async handleMail(email: EmailDto) {
    const response = new ResponseDto();
    try {      
      const result = await this.mailService.sendMail(email);
      response.data = result;
      response.error = null;
      response.message = "Message Sent";
      response.success = (result.accepted.length > 0 && result.rejected.length === 0);      
      
      return response;

    } catch (error) {
      response.data = null;
      response.error = error;
      response.message = 'Failed';
      response.success = false;

      return response;      
    }    
  }

}