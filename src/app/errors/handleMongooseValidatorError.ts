import mongoose from 'mongoose';
const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  const errorDetails = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => val,
  );
  const errorMessage = `${errorDetails[0].value} is not valid id`;
  return {
    statusCode,
    message: 'Id is invalid',
    errorMessage,
    errorDetails,
  };
};

export default handleMongooseValidationError;
