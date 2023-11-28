import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiResponse } from '/Users/andrewherlands/flexpa_work_sample/client/src/types.ts';

const eobHandler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    try {
        // validate method
        if (req.method !== 'GET') {
            res.status(400).json({ data: 'Invalid request method' });
            return;
        }

        // extract access token and patient ID
        const accessToken = req.headers['access-token'];
        const { patient: patientId } = req.query;

        // make request to Flexpa API endpoint
        const requestUrl = `https://api.flexpa.com/fhir/ExplanationOfBenefit?patient=${patientId}`;
        const flexpaApiResponse = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Flexpa-Raw': 'true'
            },
        });

        // set HTTP status based on Flexpa API response
        res.status(flexpaApiResponse.status);

        if (flexpaApiResponse.status !== 200) {
            // error from Flexpa API
            res.json({ data: flexpaApiResponse.statusText });
        } else {
            // success from Flexpa API
            const flexpaApiData = await flexpaApiResponse.json();
            res.json({ data: flexpaApiData });
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ data: 'Error parsing JSON in API response' });
    }
};

export default eobHandler;