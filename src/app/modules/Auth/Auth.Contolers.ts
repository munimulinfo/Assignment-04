import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './Auth.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthServices.createUserInToDb(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user created successfuly',
    success: true,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginDAta = req.body;
  const result = await AuthServices.loginUserWebsite(loginDAta);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'login succesfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const paswordData = req.body;
  const result = await AuthServices.userChangePassword(req.user, paswordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password change succesfully',
    data: result,
  });
});

export const AuthContolers = {
  createUser,
  loginUser,
  changePassword,
};
