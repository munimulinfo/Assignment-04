import express from 'express';
import { CategoryContolers } from './category.contolers';
import validationsRequest from '../../middlewears/validationRequest';
import { CategoryValidation } from './category.validation';
import checkAuth from '../../middlewears/checkAuth';
import { USER_ROLE } from '../Auth/Auth.constants';

const router = express.Router();
router.post(
  '/',
  checkAuth(USER_ROLE.admin),
  validationsRequest(CategoryValidation.createCategorySchemaValidation),
  CategoryContolers.createCategory,
);

router.get(
  '/',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  CategoryContolers.getAllCategory,
);

export const CategoryRoutes = router;
