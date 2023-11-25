import { getAccessToken, getPatientId, getExplanationOfBenefit} from '../pages/api/apiRequests';
  
  // mock the 'node-fetch' library
  import fetch from 'node-fetch';
  jest.mock('node-fetch');
  
  // mocked data for testing
  const mockAccessToken = 'mockAccessToken';
  const mockPatientId = 'mockPatientId';
  const mockEobData = { data: 'mockEobData' };
  
  describe('apiRequests', () => {
    afterEach(() => {
      // clear all mocks after each test
      jest.resetAllMocks();
    });
  
    describe('getAccessToken', () => {
      it('should return access token on successful fetch', async () => {
        // Save the original fetch implementation
        const originalFetch = global.fetch;
    
        // Create a mock for the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { access_token: 'mockAccessToken' } }),
        } as Response);
    
        const result = await getAccessToken('mockPublicToken');
    
        expect(result).toBe('mockAccessToken');
    
        // Restore the original implementation after the test
        global.fetch = originalFetch;
      });
    });

    describe('getPatientId', () => {
      it('should return patient ID on successful fetch', async () => {
        // Save the original fetch implementation
        const originalFetch = global.fetch;
  
        // Create a mock for the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { sub: 'https://example.com/patient/123' } }),
        } as Response);
  
        const result = await getPatientId('mockAccessToken');
  
        expect(result).toBe('123');
  
        // Restore the original implementation after the test
        global.fetch = originalFetch;
      });
  
      it('should handle errors and return null', async () => {
        // Save the original fetch implementation
        const originalFetch = global.fetch;
  
        // Create a mock for the fetch function for error case
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: false,
        } as Response);
  
        const result = await getPatientId('mockAccessToken');
  
        expect(result).toBe(null);
  
        // Restore the original implementation after the test
        global.fetch = originalFetch;
      });
    });
  
    describe('getExplanationOfBenefit', () => {
      it('should return EOB data on successful fetch', async () => {
        // Save the original fetch implementation
        const originalFetch = global.fetch;
  
        // Create a mock for the fetch function
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { someKey: 'someValue' } }),
        } as Response);
  
        const result = await getExplanationOfBenefit('123', 'mockAccessToken');
  
        expect(result).toEqual({ someKey: 'someValue' });
  
        // Restore the original implementation after the test
        global.fetch = originalFetch;
      });
  
      it('should handle errors and return null', async () => {
        // Save the original fetch implementation
        const originalFetch = global.fetch;
  
        // Create a mock for the fetch function for error case
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: false,
        } as Response);
  
        const result = await getExplanationOfBenefit('123', 'mockAccessToken');
  
        expect(result).toBe(null);
  
        // Restore the original implementation after the test
        global.fetch = originalFetch;
      });
    });
  });