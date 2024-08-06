import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { applyAppSettings } from '../../../src/settings/apply-app-settings';
import request from 'supertest';
import { EmailSendService } from '../../../src/common/service/email-send-service';
import { MockEmailSendService } from '../../../src/common/service/mock-email-send-service';

/*не пройдет тест- надо регистрацию
дописать и тогда пройдет */
describe('tests for andpoint auth/registration-email-resending', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailSendService)
      .useValue(new MockEmailSendService())

      .compile();

    app = moduleFixture.createNestApplication();

    applyAppSettings(app);

    await app.init();

    //для очистки базы данных
    /* await request(app.getHttpServer()).delete('/testing/all-data');*/
  });

  afterAll(async () => {
    await app.close();
  });

  it('registration-email-resending', async () => {
    await request(app.getHttpServer())
      .post('/auth/registration-email-resending')
      .send({
        email: 'avelminsk33@mail.ru',
      })
      .expect(204);
  });
});
