import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { ReviewRoutes } from '../modules/Review/review.route';
import { AuthRoutes } from '../modules/Auth/Auth.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route?.path, route?.route));

export default router;
