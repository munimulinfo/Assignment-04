import mongoose from 'mongoose';
import buildQuery, { QueryParams } from '../../buillder/buildQuery';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseInToDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const updateCourseInToDb = async (
  payload: Partial<TCourse>,
  courseId: string,
) => {
  const { tags, details, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  let updatedResult;
  try {
    session.startTransaction();
    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingCourseData,
    };
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`details.${key}`] = value;
      }
    }
    const updatedBasiCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    ).populate('createdBy');

    if (!updatedBasiCourse) {
      throw new Error('Failed to update course');
    }
    updatedResult = updatedBasiCourse;
    //chks tags are availabel
    if (tags && tags.length > 0) {
      const deletedtags = tags
        .filter((el) => el?.name && el?.isDeleted)
        .map((el) => el?.name);

      const deletedtagss = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            tags: { name: { $in: deletedtags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedtagss) {
        throw new Error('Failed to update tags');
      }
      updatedResult = deletedtagss;

      // filter out the new course fields
      const newAddTag = tags?.filter((el) => el.name && !el.isDeleted);

      const newTagsAdd = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { tags: { $each: newAddTag } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newTagsAdd) {
        throw new Error('Failed to add new tags');
      }

      updatedResult = newTagsAdd;
    }
    await session.commitTransaction();
    await session.endSession();
    return updatedResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to update course');
  }

  // if (tags && tags.length) {
  //   tags.forEach((tag, index) => {
  //     for (const [key, value] of Object.entries(tag)) {
  //       modifiedUpdatedData[`tags.${index}.${key}`] = value;
  //     }
  //   });
  // }
};

//   queryParams: Record<string, unknown>,
// ) => {
//   const page = (queryParams?.page as number) || 1;
//   const limit = (queryParams?.limit as number) || 10;
//   const query = buildQuery(queryParams);
//   const total = await CourseModel.countDocuments(query);

//   const result = await CourseModel.find(query)
//     .sort({
//       [queryParams?.sortBy as string]:
//         queryParams?.sortOrder === 'asc' ? 1 : -1,
//     })
//     .skip((page - 1) * limit)
//     .limit(Number(limit))
//     .lean();
//   const meta = {
//     total: total,
//     page: page,
//     limit: limit,
//   };

//   return { meta, result };
// };

const getAllCoursesDataFromDb = async (
  queryParams: QueryParams,
  // eslint-disable-next-line no-undef
): Promise<{
  meta: { total: number; page: number; limit: number };
  result: TCourse[];
}> => {
  const page = (queryParams?.page as number) || 1;
  const limit = (queryParams?.limit as number) || 10;
  const query = buildQuery(queryParams);
  const total = await CourseModel?.countDocuments(query);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortCriteria: Record<string, any> = {};
  if (
    queryParams?.sortBy &&
    [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
    ].includes(queryParams?.sortBy)
  ) {
    sortCriteria[queryParams.sortBy] =
      queryParams?.sortOrder === 'asc' ? 1 : -1;
  }

  const result = await CourseModel.find(query)
    .populate('createdBy')
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const meta = {
    total: total,
    page: page,
    limit: limit,
  };

  return { meta, result };
};

const getSingleCourseWithReviewFromDb = async (courseId: string) => {
  const result = await CourseModel.findById(courseId)
    .populate('categoryId')
    .populate('createdBy')
    .populate('reviews')
    .populate({
      path: 'reviews',
      populate: { path: 'createdBy', options: { strictPopulate: false } },
    });
  // .populate('reviews.createdBy');
  if (!result) {
    throw new Error('course is not found');
  }
  return result;
};

const getBestCourseFormDb = async () => {
  const result = await CourseModel.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $project: {
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        tags: 1,
        startDate: 1,
        endDate: 1,
        language: 1,
        provider: 1,
        durationInWeeks: 1,
        details: 1,
        createdBy: 1,
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 1 },
  ]);
  await CourseModel.populate(result, { path: 'createdBy' });
  return result;
};

export const CourseServices = {
  createCourseInToDb,
  updateCourseInToDb,
  getSingleCourseWithReviewFromDb,
  getAllCoursesDataFromDb,
  getBestCourseFormDb,
};
