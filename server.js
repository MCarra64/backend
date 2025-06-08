const express = require('express');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.get('/about', (req, res) => {
    res.send('About Us');
})

const db = require('./src/models/index');
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.log('Error synchronizing database: ', error.message);
  })
  app.use(express.json()); // Para que pueda leer JSON
  app.use(express.urlencoded({ extended: true })); // Opcional, para formularios
  const indexRouter = require('./src/routes/index');
  app.use('/', indexRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});