const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { contactType } = query;

  const parsedContactType = parseContactType(contactType);

  return {
    contactType: parsedContactType,
  };
};
