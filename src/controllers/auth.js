import {
  registerUser,
  userLogin,
  userLogout,
  refreshUser,
  requestPasswordReset,
} from '../services/auth.js';

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginController = async (req, res) => {
  const session = await userLogin(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.accessToken,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId !== 'undefined') {
    await userLogout(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUser(sessionId, refreshToken);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.accessToken,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestPasswordResetController = async (req, res) => {
  await requestPasswordReset(req.body.email);
  res.status(200).json({ status: 200, message: 'ok' });
};
