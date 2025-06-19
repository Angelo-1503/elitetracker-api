import axios, { isAxiosError } from 'axios';
import { Request, Response } from 'express';

const { GITHUB_CLIENT_ID: clientId, GITHUB_CLIENT_SECRET: clientSecret } =
	process.env;

export class AuthController {
	auth = async (request: Request, response: Response) => {
		const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

		response.redirect(redirectUrl);
	};

	authCallback = async (request: Request, response: Response) => {
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

			const {
				node_id: nodeId,
				avatar_url: avatarUrl,
				name,
			} = userDataResult.data;

			return response.send(200).json({ nodeId, avatarUrl, name });
		} catch (err) {
			if (isAxiosError(err)) {
				return response.status(400).json(err.response?.data);
			}
			return response.status(500).json({ message: 'Something went wrong' });
		}
	};
}
