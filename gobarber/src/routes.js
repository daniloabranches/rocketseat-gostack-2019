import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Danilo Abranches',
    email: 'daniloeabranches@gmail.com',
    password_hash: '000000000',
  });

  return res.json(user);
});

export default routes;
