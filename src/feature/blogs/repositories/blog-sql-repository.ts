import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateBlog } from '../api/types/dto';
import { CreateBlogInputModel } from '../api/pipes/create-blog-input-model';

@Injectable()
export class BlogSqlRepository {
  constructor(@InjectDataSource() protected dataSource: DataSource) {}

  async createNewBlog(newBlog: CreateBlog) {
    const result = await this.dataSource.query(
      `
    
    INSERT INTO public.blog(
 name, description, "websiteUrl", "createdAt","isMembership")
VALUES ($1,$2,$3,$4,$5)
RETURNING id;
    
    `,
      [
        newBlog.name,
        newBlog.description,
        newBlog.websiteUrl,
        newBlog.createdAt,
        newBlog.isMembership,
      ],
    );

    /*вернётся массив и в массиве одно значение
   это будет обьект, и у этого обьекта будет ключ id,
   или null если юзер не будет создан */
    if (!result) return null;

    return result[0].id;
  }

  async findBlog(blogId: string) {
    const result = await this.dataSource.query(
      `
 select *
from public."blog" b
where b.id = $1
    `,
      [blogId],
    );

    if (result.length === 0) return null;

    return result[0];
  }

  async updateBlog(blogId: string, updateBlogInputModel: CreateBlogInputModel) {
    const result = await this.dataSource.query(
      `
    
    UPDATE public.blog
SET  name=$1, description=$2, "websiteUrl"=$3
WHERE id=$4;
    
    `,
      [
        updateBlogInputModel.name,
        updateBlogInputModel.description,
        updateBlogInputModel.websiteUrl,
        blogId,
      ],
    );

    /*    в result будет всегда массив и всегда первым
      элементом будет ПУСТОЙ МАССИВ, а вторым элементом
      или НОЛЬ(если ничего не изменилось) или число-сколько
      строк изменилось(в данном случае еденица будет 
вторым элементом масива )*/
    if (result[1] === 0) return false;
    return true;
  }

  async deleteBlogById(blogId: string) {
    const result = await this.dataSource.query(
      `
    
    DELETE FROM public.blog
WHERE  id=$1;
    
    `,
      [blogId],
    );

    /*    в result будет всегда массив с двумя элементами
    и всегда первым
        элементом будет ПУСТОЙ МАССИВ, а вторым элементом
        или НОЛЬ(если ничего не изменилось) или число-сколько
        строк изменилось(в данном случае еденица будет
вторым элементом масива )*/

    if (result[1] === 0) return false;
    return true;
  }
}
