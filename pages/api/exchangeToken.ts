import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDataFromFlexpa } from './flexpaService';
import { ApiResponse } from '/Users/andrewherlands/flexpa_work_sample/src/app/types.ts';

const exchangeHandler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({ data: 'Invalid request method' });
      return;
    }

    const publicToken: string = req.body.publicToken;

    const flexpaResponse = await fetchDataFromFlexpa(publicToken);

    res.status(flexpaResponse.status);

    if (flexpaResponse.status !== 200) {
      res.json({ data: flexpaResponse.statusText });
    } else {
      const responseData = await flexpaResponse.json();
      res.json({ data: responseData });
    }
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ data: 'Internal Server Error' });
  }
};

export default exchangeHandler;