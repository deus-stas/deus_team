const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');


router.post('/mail', (req, res) => {
    const { name, company, link, phone, about, email, formName, budget } = req.body;
    console.log(req.body);
    // создаем объект транспорта для отправки почты
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'deus.sendler',
            pass: 'spznafyrwddmtjmu',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // настройки электронного письма
    const mailOptions = {
        from: 'Deus<noreply@de-us.ru>',
        to: 'stnslvmukhin@gmail.com',
        subject: 'Заполнена форма с сайта Deus',
        text: `Заполнена форма с сайта Deus\nФорма: ${formName}\nИмя: ${name}\nТелефон: ${phone}\nПочта: ${email}\nКомпания: ${company}\nБюджет: ${budget}\nТекст: ${about}\nПортфолио: ${link}
        `,
    };

    // отправка электронного письма
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});


module.exports = router;