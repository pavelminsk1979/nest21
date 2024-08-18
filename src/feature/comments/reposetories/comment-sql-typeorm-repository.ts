import { Injectable } from '@nestjs/common';
import { CreateComment, CreateCommentTyp } from '../api/types/dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Usertyp } from '../../users/domains/usertyp.entity';
import { Commenttyp } from '../domaims/commenttyp.entity';
import { Posttyp } from '../../posts/domains/posttyp.entity';

@Injectable()
/*@Injectable()-декоратор что данный клас инжектируемый
 * ОБЯЗАТЕЛЬНО ДОБАВЛЯТЬ  В ФАЙЛ app.module
 * providers: [AppService,UsersService,UsersRepository]*/
export class CommentSqlTypeormRepository {
  constructor(
    @InjectRepository(Commenttyp)
    private readonly commenttypRepository: Repository<Commenttyp>,
  ) {}

  async createComment(newComment: CreateCommentTyp) {
    const result = await this.commenttypRepository
      .createQueryBuilder()
      .insert()
      .into(Commenttyp)
      .values({
        content: newComment.content,
        createdAt: newComment.createdAt,
        userId: newComment.userId,
        userLogin: newComment.userLogin,
        posttyp: newComment.posttyp,
      })
      .execute();

    /*вернется айдишка нового поста */
    return result.raw[0].id;

    /*    const result = await this.dataSource.query(
          `
        
        INSERT INTO public.comment(
     content, "postId", "createdAt", "userId", "userLogin")
    VALUES ( $1,$2,$3,$4,$5)
      RETURNING id;  
        `,
          [
            newComment.content,
            newComment.postId,
            newComment.createdAt,
            newComment.userId,
            newComment.userLogin,
          ],
        );
    
        /!*вернётся массив и в массиве одно значение
       это будет обьект, и у этого обьекта будет ключ id,
       или null если юзер не будет создан *!/
        if (!result) return null;
        return result[0].id;*/
  }
}
