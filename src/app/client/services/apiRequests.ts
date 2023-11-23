// Get request - get access token
const getAccessToken = async (publicToken: string): Promise<string | null> => {
  try {
    const response = await fetch('/api/link/exchangeToken', {
        method: 'POST',
        body: JSON.stringify({ publicToken }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to obtain access token')
    }

    const exchangeTokenData = await response.json();
    return exchangeTokenData.data.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get request - get patient ID
const getPatientId = async (accessToken: string): Promise<string | null> => {
  try {
    const response = await fetch('api/link/introspectToken', {
        method: 'POST',
        headers: {
            'Access-Token': accessToken,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to obtain patient ID');
    }

    const introspectTokenData = await response.json();

    // use URL constructor to extract the pathname
    const url = new URL(introspectTokenData.data.sub)
    // extract last part of the pathname
    const patientId = url.pathname.split('/').pop();
    return patientId || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get request - get Explanation Of Benefit
const getExplanationOfBenefit = async(
    patientId: string,
    accessToken: string
): Promise<object | null> => {
    try {
        const response = await fetch(`/api/EoB?patient=${patientId}`, {
            method: 'GET',
            headers: {
                'Access-Token': accessToken,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to obtain Explanation of Benefit data.');
        }
        // parse JSON data from response
        const eobData = await response.json();
        // return data property from parsed JSON or null if data is not present
        return eobData.data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getAccessToken, getPatientId, getExplanationOfBenefit };