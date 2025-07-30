import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw new createHttpError.Conflict('Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
};

export const userLogin = async (email, password) => {
  const user = await User.findOne({ email });

  if (user === null) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch !== true) {
    throw new createHttpError.Unauthorized('Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

export const userLogout = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUser = async (sessionId, refreshToken) => {
  const session = await Session.findById({ _id: sessionId });

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw new createHttpError.Unauthorized('Refresh token in invalid');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw new createHttpError.Unauthorized('Session token expired');
  }

  await session.deleteOne({ _id: session.id });

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
};

export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (user === null) {
    throw new createHttpError.NotFound('User not found!');
  }

  console.log(user);
};
