// server.js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App'; // Путь к корневому компоненту вашего приложения
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const app = express();

// Обслуживаем статические файлы
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/*', (req, res) => {
  // Рендерим компонент App в виде строки
  const appString = ReactDOMServer.renderToString(<App />);

  // Загружаем HTML-шаблон
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла', err);
      return res.status(500).send('Ошибка сервера');
    }

    // Вставляем отрендеренный HTML в шаблон и отправляем на клиент
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});