import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostTypeorm } from '../api/types/dto';
import { Posttyp } from '../domains/posttyp.entity';

@Injectable()
export class PostSqlTypeormRepository {
  constructor(
    @InjectRepository(Posttyp)
    private readonly posttypRepository: Repository<Posttyp>,
  ) {}

  async createPost(newPost: CreatePostTypeorm) {
    const result = await this.posttypRepository
      .createQueryBuilder()
      .insert()
      .into(Posttyp)
      .values({
        title: newPost.title,
        shortDescription: newPost.shortDescription,
        content: newPost.content,
        createdAt: newPost.createdAt,
        blogName: newPost.blogName,
        blogtyp: newPost.blogtyp,
      })
      .execute();

    /*вернется айдишка нового поста */
    return result.raw[0];
  }
}