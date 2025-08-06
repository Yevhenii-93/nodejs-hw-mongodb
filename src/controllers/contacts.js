import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

export const getContactController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts(
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
      req.user.id,
    );

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

export const getContactByIdController = async (req, res) => {
  const contactId = req.params.id;
  const contact = await getContact(contactId, req.user.id);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl = null;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const contactId = req.params.id;

  const contact = await deleteContact(contactId, req.user.id);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
};

export const patchContactController = async (req, res) => {
  const photo = req.file;

  let photoUrl = null;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const contact = await updateContact(
    req.params.id,
    { ...req.body, photo: photoUrl },
    req.user.id,
  );

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
