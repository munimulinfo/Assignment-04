import { Types } from 'mongoose';

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type Tag = {
  name: string;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  createdBy?: Types.ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: TDetails;
  durationInWeeks?: number;
};
