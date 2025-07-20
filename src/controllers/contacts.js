import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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

    const contacts = await getAllContacts(page, perPage);

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
  const contact = await getContact(contactId);

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
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const contactId = req.params.id;

  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
};

export const patchContactController = async (req, res) => {
  const contact = await updateContact(req.params.id, req.body);

  if (!contact) {
    throw createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
