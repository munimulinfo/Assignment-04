/* eslint-disable @typescript-eslint/no-explicit-any */
export type QueryParams = {
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  startDate?: string;
  endDate?: string;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
  sortBy?:
    | 'title'
    | 'price'
    | 'startDate'
    | 'endDate'
    | 'language'
    | 'durationInWeeks'; // Specify valid sort fields
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

const buildQuery = (queryParams: QueryParams) => {
  const query: Record<string, any> = {};

  if (queryParams?.minPrice && queryParams?.maxPrice) {
    query.price = { $gte: queryParams?.minPrice, $lte: queryParams?.maxPrice };
  }
  if (queryParams?.tags) {
    query.tags = {
      $elemMatch: { name: { $in: queryParams.tags } },
    };
  }
  if (queryParams?.startDate && queryParams?.endDate) {
    query.startDate = { $gte: queryParams?.startDate };
    query.endDate = { $lte: queryParams?.endDate };
  }
  if (queryParams?.language) {
    query.language = queryParams?.language;
  }
  if (queryParams?.provider) {
    query.provider = queryParams?.provider;
  }
  if (queryParams?.durationInWeeks) {
    query.durationInWeeks = queryParams?.durationInWeeks;
  }

  if (queryParams?.level) {
    query['details.level'] = queryParams?.level;
  }

  return query;
};

export default buildQuery;
