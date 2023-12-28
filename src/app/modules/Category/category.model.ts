import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';
import { UserModel } from '../Auth/Auth.model';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
  createdBy: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
});

categorySchema.pre('save', async function (next) {
  const existingCategory = await CategoryModel.findOne({ name: this?.name });
  if (existingCategory) {
    throw new Error(`${existingCategory?.name} Already Exists`);
  }
  next();
});

export const CategoryModel = model<TCategory>('category', categorySchema);
