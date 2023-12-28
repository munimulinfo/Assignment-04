export type Issues = {
  expected: string;
  received: boolean | undefined;
  code: string;
  path: string[];
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  issues: Issues[];
};
