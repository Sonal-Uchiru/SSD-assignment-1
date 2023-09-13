import emailjs from 'emailjs-com'
import { EmailContent } from '../../types/email/EmailContent'

export const sendEmailAsync = (emailContent: EmailContent): Promise<void> => {
    return new Promise((resolve, reject) => {
        emailjs
            .send(
                'service_d2vcq28', //your service id
                'template_pcwlvj6', // template id
                emailContent as any, //
                '_RHTc3M-d2e4v8VNt' //
            )
            .then((result: any) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
