// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDataFromFlexpa } from './flexpaService';
import { ApiResponse } from '../../types';

const handler = async(req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  try {
    // validate request method
    if (req.method !== 'POST') {
      res.status(400).json({ data: 'Invalid request method' });
      return;
    }

    // extract publicToken from request body
    const publicToken: string = req.body.publicToken;

    // make request to Flexpa API endpoint
    const flexpaResponse = await fetchDataFromFlexpa(publicToken);

    // set HTTP status based on Flexpa API response
    res.status(flexpaResponse.status);

    // handle response data or errors
    if (flexpaResponse.status !== 200) {
      // error from Flexpa API
      res.json({ data: flexpaResponse.statusText });
    } else {
      // success from Flexpa API
      const responseData = await flexpaResponse.json();

      // success parsing JSON
      res.json({ data: responseData });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ data: 'Internal Server Error' });
  }
}