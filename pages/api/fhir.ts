import { Bundle, FhirResource } from 'fhir/r4';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

// fetch again if data not loaded in the cache
const fetchWithRetry = async (url: string, authorization: string, maxRetries = 10) => {
  let retries = 0;
  let delay = 1;
  while (retries < maxRetries) {
    try {
      console.log(`Fetching ${url}, retries: ${retries}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: authorization,
          'x-flexpa-raw': '0',
        },
      });
      if (response.status !== 429) {
        console.log(`Received ${response.status} from ${url}`);
        return response;
      }
      const retryAfter = response.headers.get('Retry-After') || delay;
      await new Promise((resolve) => setTimeout(resolve, Number(retryAfter) * 1000));
      retries++;
      delay *= 2; // Double the delay for exponential backoff
    } catch (err) {
      console.log(`Error fetching ${url}: ${err}`);
      throw err;
    }
  }

  throw new Error('Max retries reached.');
};


// fetch to fhir
export default async function fhirHandler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('All requests must be authenticated.');
  }

  const { href } = new URL(`fhir${req.url}`, process.env.FLEXPA_PUBLIC_API_BASE_URL);

  try {
    const fhirResp = await fetchWithRetry(href, authorization);
    const fhirBody: Bundle = await fhirResp.json() as Bundle<FhirResource>;
    res.status(200).json(fhirBody);
  } catch (err) {
    console.log(`Error retrieving FHIR: ${err}`);
    return res.status(500).json({ error: 'Error retrieving FHIR' });
  }
}

export { fhirHandler };