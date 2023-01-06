import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Guest } from '@prisma/client';
import { GuestService } from 'src/Services/guest.service';

@Controller('guest')
class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('create')
  async create(@Body('name') name: string, @Res() res) {
    try {
      if (!name) res.json({ message: 'property name has not null' });

      const guest = await this.guestService.createGuestAndGift(name);
      return res.json({ _id: guest.id });
    } catch (error) {
      console.log(error);

      res.json({ error: error.message }).status(500);
    }
  }

  @Get(':id')
  async getGuest(@Param('id') id: string): Promise<Guest> {
    return await this.guestService.getGuestWithGift(id);
  }

  @Put('/confirme/:id')
  async changeAttendanceStatus(
    @Param('id') id: string,
    @Body('attendance') attendance: boolean,
  ): Promise<Guest> {
    return await this.guestService.updateGuestAttendance(id, attendance);
  }
}

export { GuestController };
