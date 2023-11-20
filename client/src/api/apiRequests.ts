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

    const data = await response.json();
    return data.data.access_token;
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

    const data = await response.json();
    const regex = new RegExp('([^\/]+$)');
    const patientId = data.data.sub && data.data.sub.match(regex)[0];
    return patientId || null;
} catch (error) {
    console.error(error);
    return null;
}

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
            throw new Error('Failed to obtain Explanation of Benefit data');
        }

        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getAccessToken, getPatientId, getExplanationOfBenefit };