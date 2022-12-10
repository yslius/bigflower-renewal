import nodemailer, { SentMessageInfo } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import config from 'config'
import logs from './logs'
import path from 'path'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const option:SMTPTransport.Options = {
    host: config.get('ML_HOST'), 
    port: config.get<number>('ML_PORT'), 
    service: "gmail",
    auth: {
        user: config.get('ML_USER'),
        pass: config.get('ML_PASSWORD')?? null,
    }
}
const mailer = nodemailer.createTransport(option)

mailer.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: ''
    },
    viewPath: path.resolve('./src/views'),
    extName: '.handlebars',
}))

interface mailOption {
    from?: string,
    to: string,
    subject: string,
    template: string,
    context: any
}
export const sendMail = async (mail: mailOption) : Promise<boolean> =>{
    try {
        mail.from = config.get('ML_MAIL')
        await mailer.sendMail(mail, (error, info: SentMessageInfo)=>{
            if (error) {
                logs.error(`Send mail proccess had error: ${JSON.stringify(error)} \n Info: ${JSON.stringify(info)}`)
            }
            logs.warn(`Email ${JSON.stringify(mail)} send complete\n Info: ${JSON.stringify(info)}`)
        })
        return true
    } catch (error) {
        logs.error(`Send mail ${JSON.stringify(mail)} had error: ${JSON.stringify(error)}`)
        return false
    }
} 

export const mailVerify = async() =>{
    mailer.verify(function (error, success) {
        if (error) {
            logs.error(`Email server service had error: ${JSON.stringify(error)}`)
        } else {
            logs.info('Email server is ready to take our messages')
        }
    })
}