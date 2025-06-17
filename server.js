const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión DB
const db = require('./src/models/index');
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.log('Error synchronizing database: ', error.message);
  });

// Rutas
const tagRoutes = require('./src/routes/tag.routes');
app.use('/tags', tagRoutes);

const ventaRoutes = require('./src/routes/venta.routes');
app.use('/ventas', ventaRoutes);

const categoryRoutes = require('./src/routes/category.routes');
app.use('/categories', categoryRoutes);

const productRoutes = require('./src/routes/product.routes');
app.use('/products', productRoutes);

const authRoutes = require('./src/routes/auth.routes');
app.use('/auth', authRoutes);

const indexRouter = require('./src/routes/index');
app.use('/', indexRouter);

app.get('/products', async (req, res) => {
  const products = await db.Product.findAll({ include: ['category'] });
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});
