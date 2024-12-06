const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;

// Загрузка Swagger-документации из файла
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware для работы с JSON
app.use(express.json());

// Роут для отображения Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Эндпоинт /onPageParsed
app.post('/onPageParsed', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: 'Неверный формат данных. Поле "data" обязательно.',
    });
  }

  // Эмуляция записи данных
  console.log('Данные для сохранения:', data);

  // Ответ об успешной операции
  res.status(200).json({
    success: true,
    message: 'Данные успешно сохранены.',
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Микросервис запущен на http://localhost:${port}`);
  console.log(`Swagger UI доступен на http://localhost:${port}/api-docs`);
});
