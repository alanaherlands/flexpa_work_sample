import type { NextApiRequest, NextApiResponse } from 'next'
// import type of data if I choose to create models

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        // validate method
        if (req.method !== 'GET') {
            throw new Error('Invalid request method');
        }

        // extract access token and patient ID
        const accessToken = req.headers['access-token'];
        const { patient: patientId } = req.query;

        // make request to Flexpa API endpoint
        const requestUrl = `https://api.flexpa.com/fhir/ExplanationOfBenefit?patient=${patientId}`;
        const flexpaApiResponse = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ${accessToken}',
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
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ data: 'Internal Server Error' });
    }
};

export default handler;