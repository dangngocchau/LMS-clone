import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ _id: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface Emailoptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface IActivateUser {
  user: IUser;
  activationCode: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface ITokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

interface IUpdateProfilePicture {
  avatar: string;
}

interface IComment {
  user: IUser;
  question: string;
  questionReplies?: IAnswer[];
}

interface ICommentDocument extends Document {
  user?: IUser;
  question?: string;
  questionReplies?: IAnswer[];
}
interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

interface ICourse extends Document {
  _id: string;
  name: string;
  description?: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

interface INewQuestion {
  user: IUser;
  question: string;
  questionReplies: any;
}

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

interface IAnswer {
  user: IUser;
  answer: string;
}

interface IAddReviewData {
  review: string;
  courseId: string;
  rating: number;
  userId: string;
}

interface IReplyReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}

interface IOrder extends Document {
  userId: string;
  courseId: string;
  payment_info: object;
}

interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}

export {
  IUser,
  IRegistrationBody,
  IActivationToken,
  Emailoptions,
  IActivationRequest,
  IActivateUser,
  ILoginRequest,
  ITokenOption,
  ISocialAuthBody,
  IUpdateUserInfo,
  IUpdatePassword,
  IUpdateProfilePicture,
  ICourse,
  IReview,
  ILink,
  IComment,
  IAnswer,
  ICourseData,
  IAddQuestionData,
  INewQuestion,
  IAddAnswerData,
  ICommentDocument,
  IAddReviewData,
  IReplyReviewData,
  IOrder,
  INotification,
  FaqItem,
  Category,
  Layout,
  BannerImage,
};
