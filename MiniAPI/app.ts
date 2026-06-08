import express, { Application } from 'express';
import { loggerMiddleware } from './src/middlewares/logger';
import categoryRouter from './src/routes/category.router';
import productRouter  from './src/routes/product.router';
import ordersRouter   from './src/routes/orders';

const app: Application = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/category', categoryRouter);
app.use('/products', productRouter);
app.use('/orders',   ordersRouter);

export default app;
