import * as express from 'express';
import { IUser } from '../../interfaces/interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
