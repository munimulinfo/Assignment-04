import { Schema, model } from 'mongoose';
import { TCourse, TDetails, Tag } from './course.interface';
import { UserModel } from '../Auth/Auth.model';

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  description: { type: String, required: true },
});

const tagSchema = new Schema<Tag>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'category id is duplicate'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    price: { type: Number, required: true },
    tags: [{ type: tagSchema, required: true }],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: detailsSchema,
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'courseId',
  justOne: false,
});

courseSchema.pre('save', function (next) {
  if (!this.durationInWeeks) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const durationInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    this.durationInWeeks = Math.ceil(durationInDays / 7);
  }
  next();
});

courseSchema.pre('save', async function (next) {
  const existingCourse = await CourseModel.findOne({ title: this?.title });
  if (existingCourse) {
    throw new Error(`${existingCourse?.title} Already Exists`);
  }
  next();
});

export const CourseModel = model<TCourse>('course', courseSchema);
