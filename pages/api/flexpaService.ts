const fetchDataFromFlexpa = async (publicToken: string): Promise<Response> => {
    try {
      const flexpaResponse = await fetch('https://api.flexpa.com/link/exchange', {
        method: 'POST',
        body: JSON.stringify({ 
            'public_token': publicToken,
            'secret_key': process.env.SECRET_KEY,
          }),
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });
  
      return flexpaResponse;
    } catch (error) {
      console.error('Error fetching data from Flexpa:', error);
      throw new Error('Failed to fetch data from Flexpa');
    }
  };

export { fetchDataFromFlexpa };