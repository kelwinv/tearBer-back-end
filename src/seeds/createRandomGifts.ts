import { Injectable } from '@nestjs/common';
import { GiftService } from '../Services/gift.service';

@Injectable()
export class CreateRandomGifts {
  constructor(private readonly giftService: GiftService) {}

  async execute(count: number): Promise<void> {
    const giftNames = [
      'Panela de Pressão',
      'Ferro de Passar',
      'Liquidificador',
      'Batedeira',
      'Fogão',
      'Geladeira',
    ];
    const giftPrices = [100, 50, 150, 200, 300, 400];
    const giftImages = [
      'https://www.pexels.com/photo/black-and-silver-pressure-cooker-769773/',
      'https://www.pexels.com/photo/appliance-clothing-electric-electrical-appliance-238721/',
      'https://www.pexels.com/photo/blender-black-and-silver-blender-936370/',
      'https://www.pexels.com/photo/black-and-silver-stand-mixer-on-white-surface-1174966/',
      'https://www.pexels.com/photo/white-gas-stove-against-white-background-1250970/',
      'https://www.pexels.com/photo/white-refrigerator-with-door-open-1866520/',
    ];

    for (let i = 0; i < count; i++) {
      const giftName = giftNames[Math.floor(Math.random() * giftNames.length)];
      const giftPrice =
        giftPrices[Math.floor(Math.random() * giftPrices.length)];
      const giftImage =
        giftImages[Math.floor(Math.random() * giftImages.length)];

      await this.giftService.createGift({
        name: giftName,
        price: giftPrice,
        image: giftImage,
      });
    }
  }
}
