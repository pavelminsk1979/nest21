import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlog } from '../api/types/dto';
import { Blogtyp } from '../domains/blogtyp.entity';

@Injectable()
export class BlogSqlTypeormRepository {
  constructor(
    @InjectRepository(Blogtyp)
    private readonly blogtypRepository: Repository<Blogtyp>,
  ) {}

  async createNewBlog(newBlog: CreateBlog) {
    const result = await this.blogtypRepository
      .createQueryBuilder()
      .insert()
      .into(Blogtyp)
      .values({
        createdAt: newBlog.createdAt,
        isMembership: newBlog.isMembership,
        name: newBlog.name,
        description: newBlog.description,
        websiteUrl: newBlog.websiteUrl,
      })
      .execute();

    return result.raw[0];
  }
}
