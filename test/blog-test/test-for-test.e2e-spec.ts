import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { applyAppSettings } from '../../src/settings/apply-app-settings';

describe('tests for andpoint blogs', () => {
  let app;

  let idBlog;

  let idBlog1;

  let idBlogForUpdate;

  let idPost;

  let idPost1;

  const loginPasswordBasic64 = 'YWRtaW46cXdlcnR5';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    applyAppSettings(app);

    await app.init();

    //для очистки базы данных
    await request(app.getHttpServer()).delete('/testing/all-data');
  });

  afterAll(async () => {
    await app.close();
  });

  it('create   blog', async () => {
    const res = await request(app.getHttpServer())
      .post('/sa/blogs')
      .set('Authorization', `Basic ${loginPasswordBasic64}`)
      .send({
        name: 'name11',
        description: 'description11',
        websiteUrl: 'https://www.outue11.com/',
      })
      .expect(201);

    idBlog1 = res.body.id;

    //console.log(res.body);
  });

  /*  it('create   blog', async () => {
      const res = await request(app.getHttpServer())
        .post('/sa/blogs')
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          name: 'name12',
          description: 'description12',
          websiteUrl: 'https://www.outue12.com/',
        })
        .expect(201);
  
      //console.log(res.body.id);
  
      idBlog = res.body.id;
    });*/

  /*  it('create   blog', async () => {
      const res = await request(app.getHttpServer())
        .post('/sa/blogs')
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          name: 'name13',
          description: 'description13',
          websiteUrl: 'https://www.outue13.com/',
        })
        .expect(201);
  
      //console.log(res.body);
  
      idBlogForUpdate = res.body.id;
    });*/

  /*  it('update   blog by id', async () => {
      const res = await request(app.getHttpServer())
        .put(`/sa/blogs/${idBlogForUpdate}`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          name: 'nameUpdate',
          description: 'descripUpdate',
          websiteUrl: 'https://www.outueUpd.com/',
        })
        .expect(204);
      //console.log(res.body);
    });*/

  /*  it('delete   blog by id', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/sa/blogs/${idBlogForUpdate}`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
  
        .expect(204);
      //console.log(res.body);
    });*/

  /*  it('get  blog by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/blogs/${idBlog}`)
  
        .expect(200);
      //console.log(res.body);
    });*/

  /*  it('get all  blogs andpoint SaBlogs', async () => {
      const res = await request(app.getHttpServer())
        .get('/sa/blogs')
  
        .expect(200);
      //console.log(res.body);
    });*/

  /*  it('get all  blogs andpoint Blogs ', async () => {
      const res = await request(app.getHttpServer())
        .get('/blogs')
  
        .expect(200);
      //console.log(res.body);
    });*/

  /*  it('create post', async () => {
      const res = await request(app.getHttpServer())
        .post(`/sa/blogs/${idBlog}/posts`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          title: 'titlePost1',
          shortDescription: 'shortDescriptionPost1',
          content: 'contentPost1',
        })
        .expect(201);
  
      //console.log(res.body);
  
      idPost = res.body.id;
    });
  
    it('create post', async () => {
      const res = await request(app.getHttpServer())
        .post(`/sa/blogs/${idBlog}/posts`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          title: 'titlePost12',
          shortDescription: 'shortDescriptionPost12',
          content: 'contentPost12',
          blogId: idBlog,
        })
        .expect(201);
  
      //console.log(res.body);
    });*/

  it('create post', async () => {
    const res = await request(app.getHttpServer())
      .post(`/sa/blogs/${idBlog1}/posts`)
      .set('Authorization', `Basic ${loginPasswordBasic64}`)
      .send({
        title: 'titlePost222',
        shortDescription: 'shortDescriptionPost222',
        content: 'contentPost222',
      })
      .expect(201);

    //console.log(res.body);

    idPost1 = res.body.id;
  });

  /*  it('get   post by postId', async () => {
    const res = await request(app.getHttpServer())
      .get(`/posts/${idPost1}`)
      .set('Authorization', `Basic ${loginPasswordBasic64}`)

      .expect(200);

    //console.log(res.body);
  });*/

  it('get   posts', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts')

      .expect(200);

    console.log(res.body);
  });

  /* it('create post', async () => {
     const res = await request(app.getHttpServer())
       .post(`/sa/blogs/${idBlog1}/posts`)
       .set('Authorization', `Basic ${loginPasswordBasic64}`)
       .send({
         title: 'titlePost223',
         shortDescription: 'shortDescriptionPost223',
         content: 'contentPost223',
       })
       .expect(201);
 
     //console.log(res.body);
   });
 
   it('create post', async () => {
     const res = await request(app.getHttpServer())
       .post(`/sa/blogs/${idBlog1}/posts`)
       .set('Authorization', `Basic ${loginPasswordBasic64}`)
       .send({
         title: 'titlePost224',
         shortDescription: 'shortDescriptionPost224',
         content: 'contentPost224',
       })
       .expect(201);
 
     //console.log(res.body);
   });
 
   it('update  post', async () => {
     const res = await request(app.getHttpServer())
       .put(`/sa/blogs/${idBlog}/posts/${idPost}`)
       .set('Authorization', `Basic ${loginPasswordBasic64}`)
       .send({
         title: 'titlePUpdate',
         shortDescription: 'shortDescripUpdate',
         content: 'contentPUpdate',
       })
       .expect(204);
 
     //console.log(res.body);
   });
 
   it('delete  post', async () => {
     const res = await request(app.getHttpServer())
       .delete(`/sa/blogs/${idBlog}/posts/${idPost}`)
       .set('Authorization', `Basic ${loginPasswordBasic64}`)
 
       .expect(204);
 
     //console.log(res.body);
   });*/

  /*
    it('get all  posts', async () => {
      const res = await request(app.getHttpServer())
        .get('/posts')
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
  
        .expect(200);
  
      //console.log(res.body);
    });
  */

  /*  it('get all  posts for correct blog', async () => {
      const res = await request(app.getHttpServer())
        .get(`/blogs/${idBlog1}/posts`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
  
        .expect(200);
  
      //console.log(res.body);
    });*/

  /*  it('get all  posts for correct blog', async () => {
      const res = await request(app.getHttpServer())
        .get(`/sa/blogs/${idBlog}/posts`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
  
        .expect(200);
  
      //console.log(res.body);
    });*/

  //////////////////////////////////////////////////////////

  /*  it('create 1   blog  and get blogs', async () => {
      const blogManagerForTest = new BlogManagerForTest(app);
  
      const blog = await blogManagerForTest.createBlog(
        'name',
        'description',
        'https://www.outue.com/',
      );
  
      const res = await request(app.getHttpServer())
        .get('/blogs?pageSize=3&pageNumber=1')
        .expect(200);
      console.log(res.body);
    });
  
    it('should be mistake when create blog', async () => {
      const res = await request(app.getHttpServer())
        .post('/blogs')
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          name: '',
          description: 'description',
          websiteUrl: 'https://www.outue1.com/',
        })
        .expect(400);
      //console.log(res.body);
    });
  
    it('create 2   blogs', async () => {
      const blogManagerForTest = new BlogManagerForTest(app);
  
      const blog1 = await blogManagerForTest.createBlog(
        'name1',
        'description1',
        'https://www.outue1.com/',
      );
  
      const blog2 = await blogManagerForTest.createBlog(
        'name2',
        'description2',
        'https://www.outue2.com/',
      );
  
      const res = await request(app.getHttpServer()).get('/blogs').expect(200);
  
      //console.log(res.body);
  
      /////////////////////////////////////////
      /!*    console.log для  blog1.body
          {
            id: '666443080d85c5d56da3fa64',
              name: 'name1',
            description: 'description1',
            websiteUrl: 'https://www.outue1.com/',
            createdAt: '2024-06-08T11:39:52.710Z',
            isMembership: false
          }*!/
      // console.log(blog1.body);
  
      expect.setState({ idBlog1: blog1.body.id });
      /!*ложу значения  чтоб в других 
      тестах достать и использовать*!/
      expect.setState({ idBlog2: blog2.body.id });
  
      //const { idBlog1 } = expect.getState();
  
      //console.log(idBlog1);
  
      //expect(res.body.items[0].name).toEqual(blog1.body.name);
    });
  
    it('get correct blog ', async () => {
      const { idBlog1 } = expect.getState();
  
      const res = await request(app.getHttpServer())
        .get(`/blogs/${idBlog1}`)
  
        .expect(200);
      //console.log(res.body);
      expect(res.body.id).toEqual(idBlog1);
    });
  
    it('change  correct blog ', async () => {
      const { idBlog2 } = expect.getState();
  
      const newName = 'changeName';
  
      await request(app.getHttpServer())
        .put(`/blogs/${idBlog2}`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          name: newName,
          description: 'changeDescription',
          websiteUrl: 'https://www.changeOutue1.com/',
        })
  
        .expect(204);
  
      const res = await request(app.getHttpServer())
        .get(`/blogs/${idBlog2}`)
        .expect(200);
  
      //console.log(res.body);
      expect(res.body.name).toEqual(newName);
    });
  
    it('delete blog by id ', async () => {
      const { idBlog1 } = expect.getState();
  
      await request(app.getHttpServer())
        .delete(`/blogs/${idBlog1}`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .expect(204);
    });
  
    it('NO delete blog ... incorect id  ', async () => {
      await request(app.getHttpServer())
        .delete(`/blogs/66553b9af8e4959d6015b8d`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
  
        .expect(404);
    });
  
    it('create post for correct  blog ', async () => {
      const { idBlog2 } = expect.getState();
  
      const res = await request(app.getHttpServer())
        .post(`/blogs/${idBlog2}/posts`)
        .set('Authorization', `Basic ${loginPasswordBasic64}`)
        .send({
          title: 'title1',
          shortDescription: 'shortDescription1',
          content: 'content',
        })
  
        .expect(201);
  
      /!*  const res = await request(app.getHttpServer())
          .get(`/blogs/${idBlog2}/posts`)
          .expect(200);*!/
  
      //console.log(res.body);
  
      expect(res.body.blogId).toEqual(idBlog2);
    });
  
    it('get post by correct blogId ', async () => {
      const { idBlog2 } = expect.getState();
  
      const res = await request(app.getHttpServer())
        .get(`/blogs/${idBlog2}/posts`)
  
        .expect(200);
      //console.log(res.body.items);
      expect(res.body.items[0].blogId).toEqual(idBlog2);
    });*/
});
