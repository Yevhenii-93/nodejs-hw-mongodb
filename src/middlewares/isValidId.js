import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(new createHttpError.BadRequest('Id is not valid'));
  }
  next();
};
