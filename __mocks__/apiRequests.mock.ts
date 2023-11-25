// mock Jest functions for api requests
const fetchMock = jest.fn();

// mock the fetch function
jest.mock('node-fetch', () => fetchMock);

// import module to get access to original implementation
const realApiRequests = jest.requireActual('./apiRequests');

// mock implementation of the functions
const mockGetAccessToken = jest.fn();
const mockGetPatientId = jest.fn();
const mockGetExplanationOfBenefit = jest.fn();

// assign the mock implementations to the mocked functions
realApiRequests.getAccessToken = mockGetAccessToken;
realApiRequests.getPatientId = mockGetPatientId;
realApiRequests.getExplanationOfBenefit = mockGetExplanationOfBenefit;

export { mockGetAccessToken, mockGetPatientId, mockGetExplanationOfBenefit };