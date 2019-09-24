import { getRepository } from "typeorm";
import User from "../../entity/User";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Session from "../../entity/session";

export const createUser = async (name: string, email: string, password: string) => {
  const userRepository = await getRepository(User)

  let user = new User();
  user.name = name;
  user.email = email;
  await bcrypt
    .genSalt(12)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });

  await userRepository.save(user);
};

export const logIn = async (email: string, password: string) => {
  const userRepository = await getRepository(User);
  const sessionRepository = await getRepository(Session);

  let user = await userRepository.findOne({ email });
  if (!user) {
    throw 'Cant find an user with that email';
  }

  const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      throw 'Invalid password';
    }
  const buf = crypto.randomBytes(16);

  let session = new Session();
  session.token = buf.toString('hex');
  session.userId = user.id;

  await sessionRepository.save(session);
  return session.token;
};