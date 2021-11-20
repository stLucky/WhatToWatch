import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';

const onFakeUnauthorized = jest.fn();

export const api = createAPI(() => onFakeUnauthorized());
export const mockAPI = new MockAdapter(api);
