import Session from '../entity/session';
import { getRepository } from 'typeorm';

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.headers;
    if (typeof token !== 'string') {
      throw new Error('Request token is invalid.');
    }

    const sessionRepository = await getRepository(Session)
    const session = await sessionRepository.findOne({ token });
    if (!session) {
      throw new Error('Your session has expired. You need to log in.');
    }
    req.session = session;
    next();
  } catch (err) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Authentication credentials invalid',
          errorMessage: err.message,
        },
      ],
    });
  }
};
