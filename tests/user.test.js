const { beforeEach } = require('node:test');
const request = require('supertest');

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require('../app');
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { dataSource } = require('../src/models/dataSource');

describe('Sign Up', () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시작하기 전에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await dataSource.initialize();
  });

  afterAll(async () => {
    // 테스트 데이터베이스의 불필요한 데이터를 전부 지워줍니다.
    await dataSource.query('TRUNCATE users');

    // 모든 테스트가 끝나게 되면 DB 커넥션을 끊어줍니다.
    await dataSource.destroy();
  });

  test('SUCCESS: created user', async () => {
    await request(app)
      .post('/users/signup')
      .send({ email: 'eunsong001@gmail.com', password: 'password001@' })
      .expect(201);
  });

  test('FAILED: invalid email', async () => {
    // supertest의 request를 활용하여 app에 테스트용 request를 보냅니다.
    await request(app)
      .post('/users/signup') // HTTP Method와 엔드포인트 주소를 작성합니다.
      .send({ email: 'wrongEmail', password: 'password001@' }) // body를 작성합니다.
      .expect(400) // expect()로 예상되는 statusCode, response를 넣어 테스트할 수 있습니다.
      .expect({ message: 'INVALID_EMAIL' });
  });

  test('FAILED: invalid password', async () => {
    await request(app)
      .post('/users/signup')
      .send({ email: 'hello@gmail.com', password: 'password' })
      .expect(400)
      .expect({ message: 'INVALID_PASSWORD' });
  });

  // test('FAILED: duplicated email', async () => {
  //   await request(app)
  //     .post('/users/signup')
  //     .send({ email: '123@gmail.com', passowrd: 'password001@' })
  //     .expect(409)
  //     .expect({ message: 'DUPLICATED_EMAIL' });
  // });
});
