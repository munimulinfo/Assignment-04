import { z } from 'zod';

const createCategorySchemaValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
  }),
});

export const CategoryValidation = {
  createCategorySchemaValidation,
};
