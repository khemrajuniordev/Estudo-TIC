import express, { Application } from 'express';
import { loggerMiddleware } from './src/middlewares/logger';
import { errorMiddleware }  from './src/middlewares/error.middleware';
import authRouter           from './src/routes/auth.router';
import categoryRouter       from './src/routes/category.router';
import productRouter        from './src/routes/product.router';
import ordersRouter         from './src/routes/orders';

const app: Application = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/auth',     authRouter);
app.use('/category', categoryRouter);
app.use('/products', productRouter);
app.use('/orders',   ordersRouter);

// Deve ser registrado por último — captura todos os erros lançados nas rotas
app.use(errorMiddleware);

export default app;
