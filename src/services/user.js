import createHttpError from 'http-errors';

import { User } from '../db/models/user.js';

export const registerUser = (payload) => {
  const user = User.findOne({ email: payload.email });

  if (user !== null) {
    throw new createHttpError.Conflict('Email in use');
  }

  return User.create(payload);
};
