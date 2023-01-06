import { Module } from '@nestjs/common';
import { GiftsController } from './Controllers/gifts.controller';
import { GuestController } from './Controllers/guest.controller';
import { GiftService } from './Services/gift.service';
import { GuestService } from './Services/guest.service';
import { PrismaService } from './prisma.service';
import { testeServerController } from './Controllers/teste-free-server.controller';

@Module({
  imports: [],
  controllers: [GiftsController, GuestController, testeServerController],
  providers: [GiftService, GuestService, PrismaService],
})
export class AppModule {}
