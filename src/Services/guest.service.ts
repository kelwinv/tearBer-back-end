import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Guest } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GiftService } from './gift.service';

@Injectable()
class GuestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly giftService: GiftService,
  ) {}

  async createGuestAndGift(name: string): Promise<Guest> {
    try {
      const checkGuestExistence = await this.prisma.guest.findFirst({
        where: { name },
      });

      if (checkGuestExistence) {
        throw new HttpException(
          'Esse nome ja está em uso',
          HttpStatus.CONFLICT,
        );
      }
      const randomGifts = await this.giftService.getRandomGifts();

      if (randomGifts.length <= 0) {
        throw new HttpException(
          'Não há presentes disponíveis',
          HttpStatus.NOT_FOUND,
        );
      }

      const guest = await this.prisma.guest.create({
        data: {
          name,
          gifts: {
            connect: randomGifts.map(({ id }) => ({ id })),
          },
        },
      });

      return guest;
    } catch (error) {
      throw error;
    }
  }

  async getGuestWithGift(guestId: string): Promise<Guest> {
    return this.prisma.guest.findUnique({
      where: {
        id: guestId,
      },
      include: {
        gifts: true,
      },
    });
  }

  async updateGuestAttendance(id: string, attendance: boolean) {
    try {
      const guest = await this.prisma.guest.update({
        where: { id },
        data: { attendance },
      });
      return guest;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export { GuestService };
