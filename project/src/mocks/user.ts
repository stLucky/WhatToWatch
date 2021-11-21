import { datatype, internet } from 'faker';
import { AuthData, AuthUser } from '../types/auth-data';

export const makeFakeAuthUser = (): AuthUser => ({
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  avatarUrl: internet.avatar(),
});

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: internet.password(),
});
