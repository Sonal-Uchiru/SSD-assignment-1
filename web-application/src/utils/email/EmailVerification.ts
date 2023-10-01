import emailjs from "emailjs-com";
import { EmailContent } from "../../types/email/EmailContent";

const serviceId: string = process.env.EMAIL_JS_SERVICE_ID ?? "";
const templateId: string = process.env.EMAIL_JS_TEMPLATE_ID ?? "";
const token = process.env.EMAIL_JS_TOKEN ?? "";

export const sendEmailAsync = (emailContent: EmailContent): Promise<void> => {
  return new Promise((resolve, reject) => {
    emailjs
      .send(
        serviceId, //your service id
        templateId, // template id
        emailContent as any,
        token // token
      )
      .then((result: any) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
