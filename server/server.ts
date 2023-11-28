// import express from "express";
// import fetch from 'node-fetch';
// import { getAccessToken, getPatientId, getExplanationOfBenefit } from '../pages/api/apiRequests';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { ExchangeTokenResponse } from '../client/src/types';
// // const { createProxyMiddleware } = require('http-proxy-middleware');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 9000;

// app.use(cors());
// app.use(bodyParser.json());
// // middleware to parse JSON requests
// app.use(express.json());

// // // proxy for external API
// // app.use(
// //   '/link/exchange',
// //   cors(),
// //   createProxyMiddleware({
// //     target: process.env.FLEXPA_PUBLIC_API_BASE_URL,
// //     changeOrigin: true,
// //     pathRewrite: { '^/link/exchange': '' },
// //   })
// // );

// // route for exchanging tokens
// app.post("/link/exchange", async (req: NextApiRequest, res: NextApiResponse) => {
//   const { publicToken } = req.body;

//   if (!publicToken) {
//     return res.status(400).send("Invalid Flexpa public token");
//   };
//   console.log('Process Environment:', process.env);
//   console.log("FLEXPA_PUBLIC_API_BASE_URL:", process.env.FLEXPA_PUBLIC_API_BASE_URL);

//   if (!process.env.FLEXPA_PUBLIC_API_BASE_URL) {
//     return res.status(500).send("Invalid public API base URL");
//   };

//   try {
//     // const href = new URL('/link/exchange', process.env.FLEXPA_PUBLIC_API_BASE_URL).href;

//     // Exchange public token for access token
//     const exchangeResponse = await fetch("https://api.flexpa.com/link/exchange", {
//       method: 'POST',
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         public_token: publicToken,
//         secret_key: process.env.SECRET_KEY,
//       }),
//     });
//     const { access_token: accessToken, expires_in: expiresIn } = (await exchangeResponse.json()) as ExchangeTokenResponse;
    
//     res.send({ accessToken, expiresIn });
//   } catch (error) {
//     return res.status(500).send(`Error exchanging token: ${error}`);
//   }
// });

// // route for getting access token
// app.post('/link/getAccessToken', async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // handle the request and get access token
//     const publicToken = req.body.publicToken;
//     const accessToken = await getAccessToken(publicToken);

//     // send the access token in the response
//     res.json({ data: { access_token: accessToken } });
//   } catch (error) {
//     console.error('Error in /api/link/getAccessToken route:', (error as Error).message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // route for getting patient ID
// app.post('/link/getPatientId', async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // handle the request and get patient ID
//     const patientId = req.query.patient;
//     const accessToken = req.headers['access-token'];

//     // send the patient ID in the response
//     res.json({ data: { patientId } });
//   } catch (error) {
//     console.error('Error in /api/link/getPatientId route:', (error as Error).message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // define the route for getting Explanation of Benefit
// app.get('/link/getExplanationOfBenefit', async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // extract parameters from the request
//     const patientId = req.query.patient as string;
//     const accessToken = req.headers['access-token'] as string;

//     // handle the request and get Explanation of Benefit
//     const eobData = await getExplanationOfBenefit(patientId, accessToken);

//     // send the EOB data in the response
//     res.json({ data: { eobData } });
//   } catch (error) {
//     console.error('Error in /api/link/getExplanationOfBenefit route:', (error as Error).message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });