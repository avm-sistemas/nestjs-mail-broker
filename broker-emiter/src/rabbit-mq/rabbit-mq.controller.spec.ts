import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMqController } from './rabbit-mq.controller';

describe('RabbitMqController', () => {
  let controller: RabbitMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RabbitMqController],
    }).compile();

    controller = module.get<RabbitMqController>(RabbitMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
