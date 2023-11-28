import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

// create proxy to api
const proxy = createProxyMiddleware({
    target: 'https://api.flexpa.com',
    changeOrigin: true,
});

app.use(cors());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
})

// proxy route
app.post('/link/exchange', async (req, res) => {
    try {
        // check if req.body exists and is an object
        if (!req.body || typeof req.body !== 'object') {
          throw new Error('Invalid request body');
        }

        const { href } = new URL(`${process.env.FLEXPA_PUBLIC_API_BASE_URL}/link/exchange`);
        
        const exchangeResponse = await fetch(href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
    
        const data = await exchangeResponse.json();
        res.json(data);
      } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});
    
app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});

const configureProxy = (app) => {
    app.use('/link/exchange', proxy);
    app.use('/link/introspect', proxy);
    app.use('/fhir', proxy);
};

export default configureProxy;