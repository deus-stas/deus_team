const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");
const newsRoutes = require('./routes/api/news');
const mainPageRoutes = require('./routes/api/mainPage');
const tagsRoutes = require('./routes/api/tags');
const newsTagsRoutes = require('./routes/api/newsTags');
const seoRoutes = require('./routes/api/seo');
const workingRoutes = require('./routes/api/working');
const projectsRoutes = require('./routes/api/projects');
const personsRoutes = require('./routes/api/persons');
const themesRoutes = require('./routes/api/themes');
const typesRoutes = require('./routes/api/types');
const socialRoutes = require('./routes/api/social');
const productsRoutes = require('./routes/api/products');
const awardsRoutes = require('./routes/api/awards');
const raitingsRoutes = require('./routes/api/raitings');
const clientsRoutes = require('./routes/api/clients');
const teamRoutes = require('./routes/api/team');
const stackRoutes = require('./routes/api/stack');
const vacanciesRoutes = require('./routes/api/vacancies');
const showreelsRoutes = require('./routes/api/showreels');
const subServicesRoutes = require('./routes/api/subServices');
const servicesRoutes = require('./routes/api/services');
const reviewsRoutes = require('./routes/api/reviews');
const formRoutes = require('./routes/api/form');
const mailRoutes = require('./routes/api/mail');
const users = require("./routes/api/users");
const headerData = require("./routes/api/headerData");
const diplomasRoutes = require("./routes/api/diplomas");
const contactsRoutes = require("./routes/api/contacts");
const fs = require('fs');


const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
// app.use('/api', users);


app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false, limit: '10mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    next();
});
app.use('/api', newsRoutes);
app.use('/api', mainPageRoutes);
app.use('/api', tagsRoutes);
app.use('/api', newsTagsRoutes);
app.use('/api', seoRoutes);
app.use('/api', workingRoutes);
app.use('/api', projectsRoutes);
app.use('/api', personsRoutes);
app.use('/api', themesRoutes);
app.use('/api', typesRoutes);
app.use('/api', socialRoutes);
app.use('/api', productsRoutes);
app.use('/api', awardsRoutes);
app.use('/api', raitingsRoutes);
app.use('/api', clientsRoutes);
app.use('/api', teamRoutes);
app.use('/api', stackRoutes);
app.use('/api', vacanciesRoutes);
app.use('/api', showreelsRoutes);
app.use('/api', subServicesRoutes);
app.use('/api', servicesRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', formRoutes);
app.use('/api', mailRoutes);
app.use('/api', users);
app.use('/api', headerData);
app.use('/api', diplomasRoutes);
app.use('/api', contactsRoutes);

app.post('/api/logs', (req, res) => {
    const logs = req.body.logs;
    const logFilePath = path.join(__dirname, 'logs.txt'); // Путь к файлу логов
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${logs}\n`;

    // Запись в файл
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
            return res.status(500).send('Ошибка при записи логов');
        }
        res.status(200).send('Логи успешно записаны');
    });
});

// if (process.env.NODE_ENV === 'production') {
//     app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

// mongoose.connect(config.get('mongoURI'), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB successfully connected"))
// .catch(err => console.log(err));

const PORT = config.get('port') || 4554

// app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

async function start() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
        console.log('MongoDB is Connected...');
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()