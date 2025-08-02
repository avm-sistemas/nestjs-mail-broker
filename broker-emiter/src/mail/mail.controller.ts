import { Body, Controller, Post } from '@nestjs/common';
//import { RabbitMQService } from './rabbit-mq.service';
import { EmailDto } from 'src/dto/email.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiExtraModels(ResponseDto)
@ApiTags('Mailer')
@Controller('mailer')
export class MailController {

    constructor(private readonly mailService: MailService) {}

    @Post('send-email')
    async sendEmail(@Body() email: EmailDto) {
      const response = new ResponseDto();
      try {
        await this.mailService.sendEmail(email);

        response.success = true;
        response.data = email;
        response.error = null;
        response.message = 'message was delivered successfuly';        

        return response;

      } catch (error) {
        
        response.success = false;
        response.data = email;
        response.error = error;
        response.message = 'message was not delivered';

        return response;

      }
    }    
}
