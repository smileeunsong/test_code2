const { describe } = require('node:test');
const request = require('supertest');

// supertest의 request에 app을 담아 활용하기 위해 createApp 함수를 불러옵니다.
const { createApp } = require('../app');
// DB와의 커넥션을 위해 DataSource 객체를 불러옵니다.
const { myDataSource } = require('../src/models/dataSource');

describe('Sign Up', () => {
  let app;

  beforeAll(async () => {
    // 모든 테스트가 시갖하기 전에 app을 만들고, DataSource를 이니셜라이징 합니다.
    app = createApp();
    await AppDataSource.initialize();
  });
});
