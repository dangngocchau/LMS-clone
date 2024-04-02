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
      await LayoutModel.find(banner);
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

/** Edit Layout */
const editLayoutForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    if (type === 'Banner') {
      const bannerData: any = await LayoutModel.findOne({ type: 'Banner' });
      const { image, title, subTitle } = req.body;
      if (bannerData) {
        await cloudinary.v2.uploader.destroy(bannerData?.image?.public_id);
      }
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
      await LayoutModel.findByIdAndUpdate(bannerData.id, { banner });
    }

    if (type === 'FAQ') {
      const { faq } = req.body;
      const faqItems = await LayoutModel.findOne({ type: 'FAQ' });
      // const faqItems = await Promise.all(
      //   faq.map(async (item: FaqItem) => {
      //     return {
      //       question: item.question,
      //       answer: item.answer,
      //     };
      //   })
      // );
      await LayoutModel.findById(faqItems?._id, {
        type: 'FAQ',
        faq: faq,
      });
    }

    if (type === 'Categories') {
      const { categories } = req.body;
      const categoriesItem = await LayoutModel.findOne({ type: 'Categories' });
      await LayoutModel.findByIdAndUpdate(categoriesItem?._id, {
        type: 'Categories',
        categories,
      });
    }

    return type;
  } catch (error) {
    next(error);
  }
};

/** Get Layout By Type */
const getLayoutForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.body?.type;
    if (!type) {
      return next(new ErrorHandler('Type is not exist !', 400));
    }
    const layout = await LayoutModel.findOne({ type });
    return {
      ...layout?.toObject(),
    };
  } catch (error) {
    next(error);
  }
};

export { createLayoutForAdmin, editLayoutForAdmin, getLayoutForAdmin };
