import { z } from 'zod';

const createdetailsSchemaValidation = z.object({
  level: z.string({ required_error: 'Level is required.' }),
  description: z.string({ required_error: 'Description is required.' }),
});

const createtagSchemaValidation = z.object({
  name: z.string({ required_error: 'Tag name is required.' }),
  isDeleted: z.boolean({ required_error: 'IsDeleted flag is required.' }),
});

const updatedetailsSchemaValidation = z.object({
  level: z.string({ required_error: 'Level is required.' }).optional(),
  description: z
    .string({ required_error: 'Description is required.' })
    .optional(),
});

const updatetagSchemaValidation = z.object({
  name: z.string({ required_error: 'Tag name is required.' }).optional(),
  isDeleted: z
    .boolean({ required_error: 'IsDeleted flag is required.' })
    .optional(),
});

const createCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required.' }),
    instructor: z.string({
      required_error: 'Instructor is required.',
    }),
    categoryId: z.string({ required_error: 'Category ID is required.' }),
    price: z.number({ required_error: 'Price is required.' }),
    tags: z.array(createtagSchemaValidation),
    startDate: z.string({ required_error: 'Start date is required.' }),
    endDate: z.string({ required_error: 'End date is required.' }),
    language: z.string({
      required_error: 'Language is required.',
    }),
    provider: z.string({
      required_error: 'Provider is required.',
    }),
    details: createdetailsSchemaValidation,
  }),
});

const updateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required.' }).optional(),
    instructor: z
      .string({
        required_error: 'Instructor is required.',
      })
      .optional(),
    categoryId: z
      .string({ required_error: 'Category ID is required.' })
      .optional(),
    price: z.number({ required_error: 'Price is required.' }).optional(),
    tags: z.array(updatetagSchemaValidation).optional(),
    startDate: z
      .string({ required_error: 'Start date is required.' })
      .optional(),
    endDate: z.string({ required_error: 'End date is required.' }).optional(),
    language: z
      .string({
        required_error: 'Language is required.',
      })
      .optional(),
    provider: z
      .string({
        required_error: 'Provider is required.',
      })
      .optional(),
    details: updatedetailsSchemaValidation.optional(),
  }),
});

export const CourseValidation = {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
};
