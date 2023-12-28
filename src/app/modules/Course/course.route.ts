import express from 'express';
import validationsRequest from '../../middlewears/validationRequest';
import { CourseValidation } from './course.validation';
import { CourseContolers } from './course.contolers';
import checkAuth from '../../middlewears/checkAuth';
import { USER_ROLE } from '../Auth/Auth.constants';
const router = express.Router();

router.post(
  '/',
  checkAuth(USER_ROLE.admin),
  validationsRequest(CourseValidation.createCourseSchemaValidation),
  CourseContolers.createCourse,
);

router.put(
  '/:courseId',
  checkAuth(USER_ROLE.admin),
  validationsRequest(CourseValidation.updateCourseSchemaValidation),
  CourseContolers.updateCourse,
);
router.get(
  '/',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  CourseContolers.getAllCourseWithFiltaring,
);
router.get(
  '/:courseId/reviews',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  CourseContolers.getSingleCourseWithReview,
);
router.get(
  '/best',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  CourseContolers.getBestCourse,
);

export const CourseRoutes = router;
