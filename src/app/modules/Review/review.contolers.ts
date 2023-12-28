import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  reviewData.createdBy = req.user?._id;
  const result = await ReviewServices.createReviewInToDb(reviewData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'review created succesfully',
    data: result,
  });
});

export const ReviewContollers = {
  createReview,
};
