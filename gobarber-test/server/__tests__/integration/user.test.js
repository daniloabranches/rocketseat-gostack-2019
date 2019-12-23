import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
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
});
