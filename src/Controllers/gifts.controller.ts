import { Controller, Post, Body } from '@nestjs/common';
import { Gift } from '@prisma/client';
import { GiftService } from 'src/Services/gift.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  async createGift(@Body() gift: Gift): Promise<Gift> {
    return this.giftService.createGift(gift);
  }
}
