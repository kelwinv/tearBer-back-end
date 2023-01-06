import { Injectable } from '@nestjs/common';
import { Gift, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
class GiftService {
  constructor(private prisma: PrismaService) {}

  async createGift(data: Prisma.GiftCreateInput): Promise<Gift> {
    return this.prisma.gift.create({
      data,
    });
  }

  async getRandomGifts(): Promise<Gift[]> {
    const gifts: Gift[] = [];
    let totalPrice = 0;

    try {
      while (totalPrice < 45 || totalPrice > 55) {
        const gift = await this.getRandomGift(gifts.map(({ id }) => id));

        if (gift) {
          gifts.push(gift);
          await this.prisma.gift.update({
            where: { id: gift.id },
            data: { quantity: { decrement: 1 } },
          });

          totalPrice += gift.price;
        } else {
          break;
        }
      }
    } catch (erro) {
      for await (const gift of gifts) {
        await this.prisma.gift.update({
          where: { id: gift.id },
          data: { quantity: { increment: 1 } },
        });
      }
      console.log(erro);
    }

    return gifts;
  }

  private async getRandomGift(gifts_ids: string[]): Promise<Gift | null> {
    // Obtém todos os presentes que ainda têm quantidade disponível
    const availableGifts = await this.prisma.gift.findMany({
      where: {
        quantity: {
          gt: 0,
        },
        NOT: {
          id: { in: gifts_ids },
        },
      },
    });

    // Se não houver presentes disponíveis, retorna null
    if (availableGifts.length === 0) {
      return null;
    }

    // Seleciona um presente aleatório da lista de presentes disponíveis
    const randomIndex = Math.floor(Math.random() * availableGifts.length);

    return availableGifts[randomIndex];
  }
}

export { GiftService };
