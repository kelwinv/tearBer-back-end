import { Controller, Post, Body } from '@nestjs/common';
import { Gift } from '@prisma/client';
import { GiftService } from 'src/Services/gift.service';

export interface giftDTo {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftService: GiftService) {}

  @Post('create')
  async createGift(@Body('gifts') gifts: giftDTo[]): Promise<Gift[]> {
    return await this.giftService.createGifts(gifts);
  }
}
