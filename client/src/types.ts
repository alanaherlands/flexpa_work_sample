// types

type ApiResponse = {
    data?: string | Record<string, unknown>;
    success: boolean;
    error?: string;
};

type ExplanationOfBenefitComponentProps = {
    data: object;
}

interface ExchangeTokenResponse {
  access_token: string;
  expires_in: number;
}

interface FlexpaAccessTokenBody {
  publicToken: string;
}

export type { ApiResponse, ExplanationOfBenefitComponentProps, ExchangeTokenResponse, FlexpaAccessTokenBody };