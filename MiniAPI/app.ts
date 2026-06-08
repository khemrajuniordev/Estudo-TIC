import express, { Application } from 'express';
import { loggerMiddleware } from './src/middlewares/logger';
import productsRouter from './src/routes/products';
import ordersRouter  from './src/routes/orders';

const app: Application = express();

// Parse JSON bodies
app.use(express.json());

// Logger global
app.use(loggerMiddleware);

// Routers
app.use('/products', productsRouter);
app.use('/orders',   ordersRouter);

export default app;
