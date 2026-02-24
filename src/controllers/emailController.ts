import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export const contato = async (req: Request, res: Response) => {
    // 1 - Configurar o transponder 
    let transport = nodemailer.createTransport({
        host: process.env.TRANSPORT_HOST as string,
        port: parseInt(process.env.TRANSPORT_PORT as string),
        auth: {
            user: process.env.TRANSPORT_USER as string,
            pass: process.env.TRANSPORT_PASS as string
             }
    });
    // 2 - Configurar a mensagem de email
    let message = {
        from: "nao-responda-suportejs@suporte.com",
        to: 'suportejs@suporte.com',
        replyTo: req.body.from, 
        subject: req.body.subject, 
        html: req.body.email,
        text: req.body.email
    }
    // 3 - Enviar o email
    let info = await transport.sendMail(message);
    console.log("INFO: ", info);

    res.json({success: true});
}   