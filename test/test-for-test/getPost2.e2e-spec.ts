import cookieParser from 'cookie-parser';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { applyAppSettings } from '../../src/settings/apply-app-settings';
import request from 'supertest';

describe('tests ', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    applyAppSettings(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('get post', async () => {
    const idPost = '498f56a2-6612-4eaf-9375-e2507e5866ef';
    const res = await request(app.getHttpServer())
      .get(`/posts/${idPost}`)

      .expect(200);
    console.log('get postByPostId');
    console.log(res.body);
    console.log('get postByPostId');
  });
});
