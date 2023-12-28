import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const createCategoryInToDb = async (paylod: TCategory) => {
  const result = await CategoryModel.create(paylod);
  return result;
};

const getAllCategorysFromDb = async () => {
  const result = await CategoryModel.find().populate('createdBy');
  return result;
};

export const CategorySevices = {
  createCategoryInToDb,
  getAllCategorysFromDb,
};
