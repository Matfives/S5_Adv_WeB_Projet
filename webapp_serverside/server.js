const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const dishRoutes = require('./dish/dish.routes');
const restaurantRoutes = require('./restaurant/restaurant.routes');
const userRoutes = require('./user/user.routes');
const orderRoutes = require('./order/order.routes');

const app = express();
const port = Number(process.env.PORT || 9000);

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081']
}));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

// This checks Express only. The other endpoints also check MySQL.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api/dishes', dishRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error('Request failed:', error.code || error.message);

  let status = error.status || 500;
  let message = 'Internal server error.';

  if (error.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON request body.';
  } else if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    status = 409;
    message = 'This record is used by other records and cannot be deleted.';
  } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    status = 400;
    message = 'A referenced record (restaurant, user or dish) does not exist.';
  } else if (error.code === 'ER_DUP_ENTRY') {
    status = 409;
    message = 'This record already exists.';
  }

  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`Matking backend running at http://localhost:${port}`);
});