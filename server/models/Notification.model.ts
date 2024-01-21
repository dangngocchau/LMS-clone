import mongoose, { Document, Model, Schema } from 'mongoose';
import { INotification } from '../interfaces/interface';

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'unread',
    },
  },
  { timestamps: true }
);

const NotificationModel: Model<INotification> = mongoose.model(
  'Notification',
  NotificationSchema
);

export default NotificationModel;
