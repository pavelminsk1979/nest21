import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usertyp } from '../users/domains/usertyp.entity';
import { Securitydevicetyp } from '../security-device/domains/securitydevicetype.entity';
import { Blogtyp } from '../blogs/domains/blogtyp.entity';

@Controller('testing')
export class TestController {
  constructor(
    @InjectRepository(Usertyp)
    private readonly usertypRepository: Repository<Usertyp>,
    @InjectRepository(Securitydevicetyp)
    private readonly securitydeviceRepository: Repository<Securitydevicetyp>,
    @InjectRepository(Blogtyp)
    private readonly blogtypRepository: Repository<Blogtyp>,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('all-data')
  async deleteAllData() {
    await this.securitydeviceRepository.delete({});
    await this.usertypRepository.delete({});
    await this.blogtypRepository.delete({});
  }

  return;
}
