import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '/Users/andrewherlands/flexpa_work_sample/src/app/types.ts';

// handle the Flexpa API request
const makeFlexpaRequest = async (url: string, options: RequestInit): Promise<Response> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to make Flexpa API request: ${response.statusText}`);
    }

    return response;
  } catch (error: any) {
    throw new Error(`Error making Flexpa API request: ${error.message}`);
  }
};

// parse JSON or handle errors
const parseJsonOrError = async (response: Response): Promise<Record<string, unknown>> => {
  try {
    return await response.json();
  } catch (error: any) {
    throw new Error(`Error parsing JSON in API response: ${error.message}`);
  }
};

const handler = async(req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  try {
    // validate request method
    if (req.method !== 'POST') {
      res.status(400).json({ data: 'Invalid request method' });
      return;
    }

    // extract access token from request headers
    const accessToken = req.headers['access-token'];

    // make request to Flexpa API endpoint
    const flexpaResponse = await makeFlexpaRequest(
      'https://api.flexpa.com/link/introspect',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    // set HTTP status based on Flexpa API response
    res.status(flexpaResponse.status);

    // handle response data or errors
    try {
      const responseData = await parseJsonOrError(flexpaResponse);

      // success parsing JSON
      res.json({ data: responseData });
    } catch (error: any) {
      // error parsing JSON
      res.status(500).json({ data: error.message });
    }
  } catch (error: any) {
    // handle general errors
    console.error(error.message);
    res.status(500).json({ data: 'Internal Server Error' });
  }
}

export { makeFlexpaRequest, parseJsonOrError, handler };