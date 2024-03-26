import { Schema, model, Document } from 'mongoose';
import {
  BannerImage,
  Category,
  FaqItem,
  Layout,
} from '../interfaces/interface';

const FaqSchema = new Schema<FaqItem>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const CategorySchema = new Schema<Category>({
  title: {
    type: String,
  },
});

const BannerImageSchema = new Schema<BannerImage>({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
});

const LayoutSchema = new Schema<Layout>({
  type: {
    type: String,
  },
  faq: [FaqSchema],
  categories: [CategorySchema],
  banner: {
    image: BannerImageSchema,
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
  },
});

const LayoutModel = model<Layout>('Layout', LayoutSchema);

export default LayoutModel;
