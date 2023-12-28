import mongoose from 'mongoose';
const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errorMessage: string = `${err?.value} is a not valid id`;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    err,
  };
};

export default handleCastError;
