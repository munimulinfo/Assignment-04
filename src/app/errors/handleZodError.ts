import { ZodError } from 'zod';

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorMessage: string = err?.issues
    ?.map((issue) => issue.message)
    ?.join(' ');
  return {
    statusCode,
    errorMessage,
    message: 'Validation Error',
    err,
  };
};

export default handleZodError;
