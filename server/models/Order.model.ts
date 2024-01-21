import mongoose, { Document, Model, Schema } from 'mongoose';
import { IOrder } from '../interfaces/interface';

const OrderSchema = new Schema<IOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment_info: {
      type: Object,
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> = mongoose.model('Order', OrderSchema);

export default OrderModel;
