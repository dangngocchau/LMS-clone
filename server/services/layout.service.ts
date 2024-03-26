import { Request, Response, NextFunction } from 'express';
import LayoutModel from '../models/Layout.model';
import cloudinary from 'cloudinary';
import { FaqItem } from '../interfaces/interface';
import ErrorHandler from '../utils/ErrorHandler';

/** Create Layout */
const createLayoutForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    const isTypeExist = await LayoutModel.findOne({ type });

    if (isTypeExist) {
      return next(new ErrorHandler(`${type} already exist`, 400));
    }

    if (type === 'Banner') {
      const { image, title, subTitle } = req.body;
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: 'layout',
      });
      const banner = {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        subTitle,
      };
      await LayoutModel.create(banner);
    }

    if (type === 'FAQ') {
      const { faq } = req.body;
      // const faqItems = await Promise.all(
      //   faq.map(async (item: FaqItem) => {
      //     return {
      //       question: item.question,
      //       answer: item.answer,
      //     };
      //   })
      // );
      await LayoutModel.create({
        type: 'FAQ',
        faq: faq,
      });
    }

    if (type === 'Categories') {
      const { categories } = req.body;
      await LayoutModel.create({
        type: 'Categories',
        categories,
      });
    }

    return type;
  } catch (error) {
    next(error);
  }
};

export { createLayoutForAdmin };
