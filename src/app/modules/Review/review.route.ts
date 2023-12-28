import express from 'express';
import validationsRequest from '../../middlewears/validationRequest';
import { ReviewValidation } from './review.validation';
import { ReviewContollers } from './review.contolers';
import checkAuth from '../../middlewears/checkAuth';
import { USER_ROLE } from '../Auth/Auth.constants';

const router = express.Router();
router.post(
  '/',
  checkAuth(USER_ROLE.user),
  validationsRequest(ReviewValidation.createReviewSchemaValidation),
  ReviewContollers.createReview,
);

export const ReviewRoutes = router;
