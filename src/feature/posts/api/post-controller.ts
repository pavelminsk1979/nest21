import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../services/post-service';
import { PostWithLikesInfo, ViewModelWithArrayPosts } from './types/views';
import { ViewArrayComments } from '../../comments/types/views';
import { AuthGuard } from '../../../common/guard/auth-guard';
import { CreateCommentForPostInputModel } from './pipes/create-coment-for-post-input-model';
import { AuthTokenGuard } from '../../../common/guard/auth-token-guard';
import { QueryParamsInputModel } from '../../../common/pipes/query-params-input-model';
import { CommentService } from '../../comments/services/comment-service';
import { Request } from 'express';
import { SetLikeStatusForPostInputModel } from './pipes/set-like-status-input-model';
import { DataUserExtractorFromTokenGuard } from '../../../common/guard/data-user-extractor-from-token-guard';
import { PostQuerySqlRepository } from '../repositories/post-query-sql-repository';
import { CommentQuerySqlRepository } from '../../comments/reposetories/comment-query-sql-repository';

@Controller('posts')
export class PostsController {
  constructor(
    protected postService: PostService,
    protected commentService: CommentService,
    protected postQuerySqlRepository: PostQuerySqlRepository,
    protected commentQuerySqlRepository: CommentQuerySqlRepository,
  ) {}

  /*  @UseGuards(AuthGuard, DataUserExtractorFromTokenGuard)
    /!*  @HttpCode(HttpStatus.CREATED) по умолчанию 201
      поэтому необязательно это прописывать *!/
    @Post()
    async createPost(
      @Body() createPostInputModel: CreatePostInputModel,
    ): Promise<PostWithLikesInfo | null> {
      /!* создать новый пост  и вернуть данные этого поста и также
      внутри структуру данных(снулевыми значениями)  о лайках  к этому посту*!/
  
      const postId: string | null =
        await this.postService.createPost(createPostInputModel);
  
      if (!postId) {
        throw new NotFoundException(
          'Cannot create post because blog does not exist-:method-post,url-posts',
        );
      }
  
      const post: PostWithLikesInfo | null =
        await this.postQuerySqlRepository.getPostById(postId);
  
      if (post) {
        return post;
      } else {
        throw new NotFoundException('Cannot create post- :method-post,url-posts');
      }
    }*/

  @UseGuards(DataUserExtractorFromTokenGuard)
  @Get()
  async getPosts(
    @Query() queryParamsPostInputModel: QueryParamsInputModel,
    @Req() request: Request,
  ): Promise<ViewModelWithArrayPosts> {
    /*Айдишка пользователя нужна для-- когда
 отдадим ответ в нем будет информация
 о том какой статус учтановил данный пользователь
 который этот запрос делает */

    const userId: string | null = request['userId'];

    const posts: ViewModelWithArrayPosts =
      await this.postQuerySqlRepository.getPosts(
        queryParamsPostInputModel,
        userId,
      );

    return posts;
  }

  @UseGuards(DataUserExtractorFromTokenGuard)
  @Get(':id')
  async getPostById(
    @Param('id') postId: string,
    @Req() request: Request,
  ): Promise<PostWithLikesInfo | null> {
    /*Айдишка пользователя нужна для-- когда
отдадим ответ в нем дудет информация
о том какой статус учтановил данный пользователь
который этот запрос делает */

    const userId: string | null = request['userId'];

    const post: PostWithLikesInfo | null =
      await this.postQuerySqlRepository.getPostById(postId, userId);

    if (post) {
      return post;
    } else {
      throw new NotFoundException('post not found:method-get,url /posts/id');
    }
  }

  /*  @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    async updateBlog(
      @Param('id') postId: string,
      @Body() updatePostInputModel: UpdatePostInputModel,
    ) {
      const isUpdatePost: boolean = await this.postService.updatePost(
        postId,
        updatePostInputModel,
      );
  
      if (isUpdatePost) {
        return;
      } else {
        throw new NotFoundException(
          'post not update:andpoint-put ,url /posts/id',
        );
      }
    }*/

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePostById(@Param('id') postId: string) {
    const isDeletePostById = await this.postService.deletePostById(postId);

    if (isDeletePostById) {
      return;
    } else {
      throw new NotFoundException(
        'post not found:andpoint-delete,url /post/id',
      );
    }
  }

  @UseGuards(DataUserExtractorFromTokenGuard)
  @Get(':postId/comments')
  async getCommentsForPost(
    @Param('postId') postId: string,
    @Query() queryCommentsForPost: QueryParamsInputModel,
    @Req() request: Request,
  ): Promise<ViewArrayComments> {
    /*Айдишка пользователя нужна для-- когда
отдадим ответ в нем будет информация
о том какой статус учтановил данный пользователь
который этот запрос делает */

    const userId: string | null = request['userId'];

    //вернуть все коментарии(массив) корректного поста
    //и у каждого коментария будут данные о лайках
    //к этому коментарию

    const comments: ViewArrayComments | null =
      await this.commentQuerySqlRepository.getComments(
        userId,
        postId,
        queryCommentsForPost,
      );

    if (comments) {
      return comments;
    } else {
      throw new NotFoundException(
        'post or comments  is not exists  ' +
          ':method-get,url -posts/postId/comments',
      );
    }
  }

  /*для создания КОМЕНТАРИЯ надо чтоб пользователь
  был залогинен и у него был AccessToken в заголовках
  AuthTokenGuard сам достанет токен из заголовков
  и проверку сделает этого токена
  */
  @UseGuards(AuthTokenGuard)
  @Post(':postId/comments')
  async createCommentForPost(
    @Param('postId') postId: string,
    @Body() createCommentForPostInputModel: CreateCommentForPostInputModel,
    @Req() request: Request,
  ) {
    // когда AccessToken проверяю в AuthTokenGuard - тогда
    // из него достаю userId и помещаю ее в request

    const userId = request['userId'];

    //cоздаю в базе документ КОМЕНТ

    const commentId: string | null = await this.commentService.createComment(
      userId,
      postId,
      createCommentForPostInputModel.content,
    );

    if (!commentId) {
      throw new NotFoundException(
        'comment not create :method-post,url-posts/:postId/comments',
      );
    }

    /* Один коментарий надо получить и вернуть---тот
     который только что создал

     ---userId  чтоб вернуть статус установленый этим юзером*/

    const comment = await this.commentQuerySqlRepository.getCommentById(
      userId,
      commentId,
    );

    if (comment) {
      return comment;
    } else {
      /*HTTP-код 404*/
      throw new NotFoundException(
        'comment not create :method-post,url-posts/:postId/comments',
      );
    }
  }

  @UseGuards(AuthTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':postId/like-status')
  async setLikeStatusForPost(
    @Param('postId') postId: string,
    @Body() likeStatusForPostInputModel: SetLikeStatusForPostInputModel,
    @Req() request: Request,
  ) {
    /* ---лайкСтатус будет конкретного user
     и для конкретного поста
     -----лайкСтатус  будет создан новый документ
     или изменен уже существующий документ*/

    const userId = request['userId'];

    const isSetLikestatusForPost: boolean =
      await this.postService.setLikestatusForPost(
        userId,
        postId,
        likeStatusForPostInputModel.likeStatus,
      );

    if (isSetLikestatusForPost) {
      return;
    } else {
      throw new NotFoundException(
        'post not exist :method-put ,url /posts/postId/like-status',
      );
    }
  }
}
