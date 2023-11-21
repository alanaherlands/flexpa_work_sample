import { getAccessToken, getPatientId, getExplanationOfBenefit} from '../client/src/services/apiRequests';
  
  // Mock the 'node-fetch' library
  import fetch from 'node-fetch';
  jest.mock('node-fetch');
  
  // Mocked data for testing
  const mockAccessToken = 'mockAccessToken';
  const mockPatientId = 'mockPatientId';
  const mockEobData = { data: 'mockEobData' };
  
  describe('apiRequests', () => {
    afterEach(() => {
      // Clear all mocks after each test
      jest.resetAllMocks();
    });
  
    describe('getAccessToken', () => {
      it('should return access token on successful fetch', async () => {
        // Mock the fetch implementation
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { access_token: mockAccessToken } }),
        });
  
        const result = await getAccessToken('mockPublicToken');
  
        expect(result).toBe(mockAccessToken);
      });
  
      it('should return null on failed fetch', async () => {
        // Mock the fetch implementation
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({ ok: false });
  
        const result = await getAccessToken('mockPublicToken');
  
        expect(result).toBeNull();
      });
    });
  
    // ... (similar modifications for other functions)
  });