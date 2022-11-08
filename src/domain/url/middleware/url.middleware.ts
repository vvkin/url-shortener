import { Request, Response, NextFunction } from 'express';
import { HttpBadRequest } from '@lib/errors/http-errors';
import { isValidUrl } from '@lib/utils/url';

const validateAlias = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req?.params?.alias.trim()) {
    const reason = '"alias" parameter is required';
    next(new HttpBadRequest(reason));
  } else next();
};

const validateUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!isValidUrl(req?.body?.url)) {
    const reason = '"url" parameter should be a valid URL identifier';
    next(new HttpBadRequest(reason));
  } else next();
};

export { validateAlias, validateUrl };
