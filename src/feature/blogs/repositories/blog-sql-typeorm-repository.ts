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
    const blog = new Blogtyp();
    blog.createdAt = newBlog.createdAt;
    blog.isMembership = newBlog.isMembership;
    blog.name = newBlog.name;
    blog.description = newBlog.description;
    blog.websiteUrl = newBlog.websiteUrl;

    const result: Blogtyp = await this.blogtypRepository.save(blog);

    return result;
  }
}
