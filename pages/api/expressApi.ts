import express, { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import { ExchangeTokenResponse, FlexpaAccessTokenBody } from '../../client/src/types';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { publicToken } = req.body as FlexpaAccessTokenBody;

    if (!publicToken) {
      return res.status(400).json({ success: false, error: 'Invalid FLexpa public token' });
    }

    if (!process.env.NEXT_PUBLIC_FLEXPA_PUBLIC_API_BASE_URL) {
      return res.status(500).json({ success: false, error: 'Invalid public API base URL' });
    }

    const { href } = new URL('link/exchange', process.env.NEXT_PUBLIC_FLEXPA_PUBLIC_API_BASE_URL);

    try {
      const resp = await fetch(href, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          public_token: publicToken,
          secret_key: process.env.SECRET_KEY,
        }),
      });

      const { access_token: accessToken, expires_in: expiresIn } = (await resp.json()) as ExchangeTokenResponse;
  
      res.send({ accessToken, expiresIn });
    } catch (err) {
      return res.status(500).json({ success: false, error: `Error exchanging token: ${err}` });
    }
});

export default router;