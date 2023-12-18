require('dotenv').config();
import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { Emailoptions } from '../interfaces/interface';

const sendMail = async (options: Emailoptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '578'),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  /** Get the path to the email template */
  const templatePath = path.join(__dirname, '../mails', template);

  /** Render email template with ejs */
  const html: string = await ejs.renderFile(templatePath, data);

  /** Send email */
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendMail;
