import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactsCollection.find({ userId });

  if (typeof filter.contactType !== 'undefined') {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, data] = await Promise.all([
    ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPage = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPage,
    hasNextPage: totalPage > page,
    hasPreviousPage: page > 1,
  };
};

export const getContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return contact;
};
