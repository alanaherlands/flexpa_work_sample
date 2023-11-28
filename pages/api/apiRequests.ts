// Post request: get access token
const getAccessToken = async (publicToken: string): Promise<string | null> => {
    try {
      const { href } = new URL('http://localhost:9000/');
      const response = await fetch(`${href}link/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          publicToken,
        }),
      });
      
      console.log('Flexpa Public API Base URL - ', process.env.NEXT_PUBLIC_FLEXPA_PUBLIC_API_BASE_URL);
      console.log('getAccessToken - Response:', response);
  
      if (!response.ok) {
        const errorMessage = 'Failed to obtain access token.';
        const status = response.status;
        throw Object.assign(new Error(errorMessage), { status });
      }
  
      const exchangeTokenData = await response.json();
      console.log('Exchange Token Data:', exchangeTokenData);
      return exchangeTokenData.data.access_token;
    } catch (error) {
      console.error('Error in getAccessToken:', {
        message: error instanceof Error ? error.message : error,
        status: error instanceof Error && 'status' in error ? error.status : undefined,
      });
      return null;
    }
  };

// Post request: get patient ID
const getPatientId = async (accessToken: string): Promise<string | null> => {
    try {
      const response = await fetch("/link/introspect", {
        method: 'POST',
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('getPatientId - Response:', response); // Log the response
  
      if (!response.ok) {
        const errorMessage = 'Failed to obtain patient ID';
        const status = response.status;
        console.error('getPatientId - HTTP Error:', {
          message: errorMessage,
          status,
        });
        throw Object.assign(new Error(errorMessage), { status });
      }
  
      const introspectTokenData = await response.json();
  
      // use URL constructor to extract the pathname
      const url = new URL(introspectTokenData.data.sub);
      // extract last part of the pathname
      const patientId = url.pathname.split('/').pop();
      return patientId || null;
    } catch (error) {
      console.error('Error in getPatientId:', {
        message: (error instanceof Error ? error.message : error),
        status: (error instanceof Error && 'status' in error ? error.status : undefined),
      });
      return null;
    }
  };
  
  // Get request - get explanation of benefit
  const getExplanationOfBenefit = async (
    patientId: string,
    accessToken: string
  ): Promise<object | null> => {
    try {
      const response = await fetch(`/fhir/ExplanationOfBenefit?patient=${patientId}`, {
        method: 'GET',
        headers: {
          'Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('getExplanationOfBenefit - Response:', response); // Log the response
  
      if (!response.ok) {
        const errorMessage = 'Failed to obtain Explanation of Benefit data.';
        const status = response.status;
        console.error('getExplanationOfBenefit - HTTP Error:', {
          message: errorMessage,
          status,
        });
        throw Object.assign(new Error(errorMessage), { status });
      }
      // parse JSON data from response
      const eobData = await response.json();
      // return data property from parsed JSON or null if data is not present
      return eobData.data || null;
    } catch (error) {
      console.error('Error in getExplanationOfBenefit:', {
        message: (error instanceof Error ? error.message : error),
        status: (error instanceof Error && 'status' in error ? error.status : undefined),
      });
      return null;
    }
  };

export { getAccessToken, getPatientId, getExplanationOfBenefit };