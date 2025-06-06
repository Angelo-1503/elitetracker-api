import axios, { isAxiosError } from 'axios';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const {
  GITHUB_CLIENT_ID: clientId,
  GITHUB_CLIENT_SECRET: clientSecret,
  JWT_SECRET: secret,
  JWT_EXPIRES_IN: expiresIn,
} = process.env;

export class AuthController {
  auth = async (request: Request, response: Response) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

    response.redirect(redirectUrl);
  };

  authCallBack = async (request: Request, response: Response) => {
    try {
      const { code } = request.query;

      const accessTokenResult = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      const userDataResult = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessTokenResult.data.access_token}`,
        },
      });

      const { node_id: id, avatar_url: avatarUrl, name } = userDataResult.data;

      const token = jwt.sign({ id }, String(secret), {
        expiresIn: '1d',
      });

      return response.status(200).json({ id, avatarUrl, name, token });
    } catch (err) {
      if (isAxiosError(err)) {
        return response.status(400).json(err.response?.data);
      }

      return response.status(500).json({ message: 'Something went wrong.' });
    }
  };
}

/**
 * 7787df7de20bbe412caa
 */
