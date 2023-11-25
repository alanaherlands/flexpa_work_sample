const express = require('express');
import fetch from 'node-fetch';
import { getAccessToken, getPatientId, getExplanationOfBenefit } from '../pages/api/apiRequests';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ExchangeTokenResponse } from '../src/app/types';
const app = express();
const port = process.env.PORT || 3001;
const secretKey: string = process.env.SECRET_KEY || '';

// middleware to parse JSON requests
app.use(express.json());

// route for exchanging tokens
app.post("/link/exchange", async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const publicToken = req.body.publicToken;

    // Exchange public token for access token
    const exchangeResponse = await fetch('https://api.flexpa.com/link/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_token: publicToken,
        secret_key: secretKey,
      }),
    });

    if (!exchangeResponse.ok) {
      throw new Error(`Failed to exchange tokens: ${exchangeResponse.statusText}`);
    }

    const exchangeTokenData = (await exchangeResponse.json()) as ExchangeTokenResponse;

    const accessToken = await getAccessToken(exchangeTokenData.data.access_token);

    res.json({ data: { access_token: accessToken } });
  } catch (error) {
    console.error('Error in /link/exchangeToken route:', (error as Error).message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route for getting access token
app.post('/link/getAccessToken', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // handle the request and get access token
    const publicToken = req.body.publicToken;
    const accessToken = await getAccessToken(publicToken);

    // send the access token in the response
    res.json({ data: { access_token: accessToken } });
  } catch (error) {
    console.error('Error in /api/link/getAccessToken route:', (error as Error).message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route for getting patient ID
app.post('/link/getPatientId', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // handle the request and get patient ID
    const accessToken = req.body.accessToken;
    const patientId = await getPatientId(accessToken);

    // send the patient ID in the response
    res.json({ data: { patientId } });
  } catch (error) {
    console.error('Error in /api/link/getPatientId route:', (error as Error).message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// define the route for getting Explanation of Benefit
app.get('/link/getExplanationOfBenefit', async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // extract parameters from the request
    const patientId = req.query.patient as string;
    const accessToken = req.headers['access-token'] as string;

    // handle the request and get Explanation of Benefit
    const eobData = await getExplanationOfBenefit(patientId, accessToken);

    // send the EOB data in the response
    res.json({ data: { eobData } });
  } catch (error) {
    console.error('Error in /api/link/getExplanationOfBenefit route:', (error as Error).message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});