import { Router } from 'express';

import {
  getContactController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactController));
router.get('/:id', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

export default router;
