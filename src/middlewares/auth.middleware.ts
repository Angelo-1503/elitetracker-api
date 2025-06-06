import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { User } from '../@types/user.type';

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Token not provided.' });
  }

  const [, token] = authToken.split(' ');

  try {
    jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        throw new Error();
      }

      request.user = decoded as User;
    });
  } catch (err) {
    return response.status(401).json({ message: 'Token is invalid.' });
  }

  next();
}
