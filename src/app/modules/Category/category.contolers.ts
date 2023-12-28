import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategorySevices } from './category.services';

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  category.createdBy = req.user?._id;
  const result = await CategorySevices.createCategoryInToDb(category);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'category create succesfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategorySevices.getAllCategorysFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All category retrieved succesfully',
    data: { categories: result },
  });
});

export const CategoryContolers = {
  createCategory,
  getAllCategory,
};
