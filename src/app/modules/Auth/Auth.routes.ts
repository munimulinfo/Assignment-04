import express from 'express';
import validationsRequest from '../../middlewears/validationRequest';
import { AuthValidation } from './Auth.validtion';
import { AuthContolers } from './Auth.Contolers';
import checkAuth from '../../middlewears/checkAuth';
import { USER_ROLE } from './Auth.constants';

const router = express.Router();

router.post(
  '/register',
  validationsRequest(AuthValidation.userCreateValidationSchema),
  AuthContolers.createUser,
);
router.post(
  '/login',
  validationsRequest(AuthValidation.userLoginValidationSchema),
  AuthContolers.loginUser,
);

router.post(
  '/change-password',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  validationsRequest(AuthValidation.userPasswordValidation),
  AuthContolers.changePassword,
);

export const AuthRoutes = router;
