import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestPasswordResetController,
} from '../controllers/auth.js';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
} from '../validation/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/reset-pwd',
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController),
);

export default router;
