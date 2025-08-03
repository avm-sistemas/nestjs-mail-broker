import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailDto } from './dto/email.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const mailPackage: EmailDto = {
        email: 'avmesquita@gmail.com', 
        message: 'Tested!',
        subject: 'Test'
      };
      expect(appController.handleMail(mailPackage)).toBe({ success: true });
    });
  });
});
