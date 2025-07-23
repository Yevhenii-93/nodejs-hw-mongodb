import { registerUser } from '../services/user.js';

export const registerController = async (res, req) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};
