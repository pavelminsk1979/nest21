import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usertyp } from '../users/domains/usertyp.entity';

@Controller('testing')
export class TestController {
  constructor(
    @InjectRepository(Usertyp)
    private readonly usertypRepository: Repository<Usertyp>,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('all-data')
  async deleteAllData() {
    await this.usertypRepository.delete({});

    return;
  }
}
