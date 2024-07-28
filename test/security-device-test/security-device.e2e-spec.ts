import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { applyAppSettings } from '../../src/settings/apply-app-settings';
import request from 'supertest';
import { UserManagerForTest } from '../utils/user-manager-for-test';
import cookieParser from 'cookie-parser';

describe('tests for andpoint security/devices', () => {
  let app;

  let refreshToken;

  let deviceId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    applyAppSettings(app);

    await app.init();

    //для очистки базы данных
    await request(app.getHttpServer()).delete('/testing/all-data');
  });

  afterAll(async () => {
    await app.close();
  });

  it('creat user and login  user', async () => {
    const userManagerForTest = new UserManagerForTest(app);

    const login1 = 'login123';

    const password1 = 'password123';

    const email1 = 'email123@ema.com';

    await userManagerForTest.createUser(login1, password1, email1);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        loginOrEmail: login1,
        password: password1,
      })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
    /*    если я положу  refreshToken в куку -вот так
         response.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
      });
        ......это значит он в заголовках
    
        свойство res.headers['set-cookie'] содержит
        массив строк, представляющих заголовки 'Set-Cookie',
          включая куку 'refreshToken'.*/
    const allCookies = res.headers['set-cookie'];

    const refrToken = allCookies[0].split(';')[0];

    refreshToken = refrToken.split('=')[1];

    //console.log(res.body.accessToken);

    //console.log(refreshToken);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        loginOrEmail: login1,
        password: password1,
      })
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        loginOrEmail: login1,
        password: password1,
      })
      .expect(200);
  });

  it('get all devices', async () => {
    const res = await request(app.getHttpServer())
      .get('/security/devices')
      .set('Cookie', `refreshToken=${refreshToken}`)
      .expect(200);

    const allCookies = res.headers['set-cookie'];

    //console.log(allCookies[0].split(';')[0]);

    //console.log(res.body.accessToken);

    //console.log(res.body[0].deviceId);

    //console.log(res.body);

    deviceId = res.body[0].deviceId;
  });

  it('delete all devices exept current device', async () => {
    const res = await request(app.getHttpServer())
      .delete('/security/devices')
      .set('Cookie', `refreshToken=${refreshToken}`)
      .expect(204);

    const allCookies = res.headers['set-cookie'];

    //console.log(allCookies[0].split(';')[0]);

    //console.log(res.body.accessToken);

    //.log(res.body);
  });

  /*  const deviceIdBad = '0e1ff4f6-13a8-468a-8169-8d807da2b7b4';
  
    it('delete  device by deviceId', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/security/devices/${deviceIdBad}`)
        .set('Cookie', `refreshToken=${refreshToken}`)
        .expect(403);
    });*/

  it('delete  device by deviceId', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/security/devices/${deviceId}`)
      .set('Cookie', `refreshToken=${refreshToken}`)
      .expect(204);

    const allCookies = res.headers['set-cookie'];

    //console.log(allCookies[0].split(';')[0]);

    //console.log(res.body.accessToken);

    //.log(res.body);
  });
});
