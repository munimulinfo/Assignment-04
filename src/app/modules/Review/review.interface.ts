import { Types } from 'mongoose';

export type TReview = {
  courseId: Types.ObjectId;
  createdBy?: Types.ObjectId;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
};
