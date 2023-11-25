type ApiResponse = {
    data: string | Record<string, unknown>;
};

type ExplanationOfBenefitComponentProps = {
    data: object;
}

interface ExchangeTokenResponse {
    data: {
      access_token: string;
    };
  }

export type { ApiResponse, ExplanationOfBenefitComponentProps, ExchangeTokenResponse };