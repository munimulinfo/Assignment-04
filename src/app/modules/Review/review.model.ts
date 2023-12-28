import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';
import { UserModel } from '../Auth/Auth.model';

const reviewSchema = new Schema<TReview>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ReviewModel = model<TReview>('Review', reviewSchema);
