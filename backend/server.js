const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db');
const chapterRoutes = require('./routes/api');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Подключение маршрутов
app.use('/api', chapterRoutes);

// Проверка подключения к базе данных
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();