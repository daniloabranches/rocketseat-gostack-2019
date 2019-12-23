import request from 'supertest';

import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve conseguir registrar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Danilo',
        email: 'teste@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('não deve conseguir registrar email duplicado', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Danilo',
        email: 'teste@gmail.com',
        password_hash: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Danilo',
        email: 'teste@gmail.com',
        password_hash: '123456',
      });

    expect(response.status).toBe(400);
  });
});
