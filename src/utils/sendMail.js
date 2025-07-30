import nodemailer from 'nodemailer';

const transport = nodemailer.transport({
  host: '',
  port: '',
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
});

export const sendMail = (mail) => {
  return sendMail(mail);
};
