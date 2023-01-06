import { Controller, Get } from '@nestjs/common';

@Controller()
class testeServerController {
  @Get('/ping')
  async Ping() {
    return { message: 'pong', status: 200 };
  }
}

export { testeServerController };
