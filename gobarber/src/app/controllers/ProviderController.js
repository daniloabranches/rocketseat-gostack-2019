import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class ProviderController {
  async index(req, res) {
    const cacheKey = 'providers';

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    Cache.set(cacheKey, providers);

    return res.json(providers);
  }
}

export default new ProviderController();
