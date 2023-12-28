import { z } from 'zod';

const createReviewSchemaValidation = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Course ID is required.' }),
    rating: z
      .number({ required_error: 'Rating is required.' })
      .refine((value) => [1, 2, 3, 4, 5].includes(value), {
        message: 'Rating must be between 1 and 5.',
      }),
    review: z.string({ required_error: 'Review is required.' }),
  }),
});

export const ReviewValidation = {
  createReviewSchemaValidation,
};
