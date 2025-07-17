import { Router } from 'express';

import {
  getContactController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getContactController));
router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch('/:id', isValidId, ctrlWrapper(patchContactController));

export default router;
