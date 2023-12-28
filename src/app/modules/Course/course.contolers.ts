import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const courseData = req.body;
  courseData.createdBy = req.user?._id;
  const result = await CourseServices.createCourseInToDb(courseData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Created Successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const updateData = req.body;
  const result = await CourseServices.updateCourseInToDb(updateData, courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'CourseData Updated Successfully',
    data: result,
  });
});

const getAllCourseWithFiltaring = catchAsync(async (req, res) => {
  const allQuery = req.query;
  const result = await CourseServices.getAllCoursesDataFromDb(allQuery);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses is fetched succesfully',
    data: result,
  });
});

const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getSingleCourseWithReviewFromDb(courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFormDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best Course Retrived Successfully',
    data: result,
  });
});

export const CourseContolers = {
  createCourse,
  updateCourse,
  getSingleCourseWithReview,
  getAllCourseWithFiltaring,
  getBestCourse,
};
