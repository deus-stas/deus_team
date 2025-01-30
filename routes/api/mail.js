const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/mail', (req, res) => {
    const { name, company, link, phone, about, email, formName, budget } = req.body;
    // создаем объект транспорта для отправки почты
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'sales@de-us.ru',
            pass: '8v3wBbdE9FwpgJNN8fxs',//'sTaiToUY1_t1',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // настройки электронного письма
    const mailOptions = {
        from: 'DEUS заявка<sales@de-us.ru>',
        to: 'hello@de-us.ru',
        subject: 'Заполнена форма с сайта Deus',
        text: `Заполнена форма с сайта Deus\nФорма: ${formName}\nИмя: ${name}\nТелефон: ${phone}\nПочта: ${email}\nКомпания: ${company}\nБюджет: ${budget}\nТекст: ${about}\nПортфолио: ${link}
        `,
    };
    console.log(mailOptions);
    // отправка электронного письма
    const resmes = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(`Something went wrong: ${error}`);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});


module.exports = router;