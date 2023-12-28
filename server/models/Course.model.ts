import mongoose, { Document, Model, Schema } from 'mongoose';
import {
  IComment,
  ICourse,
  ICourseData,
  ILink,
  IReview,
} from '../interfaces/interface';

const ReviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

const LinkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const CommentSchema = new Schema<IComment & Document>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const CourseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [LinkSchema],
  suggestion: String,
  questions: [CommentSchema],
});

const CourseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benefits: [{ title: String }],
  prerequisites: [{ title: String }],
  review: [ReviewSchema],
  courseData: [CourseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
});

const CourseModel: Model<ICourse> = mongoose.model('Course', CourseSchema);
export default CourseModel;
