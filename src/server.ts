import express, { json } from 'express';
import CategoryRoutes from './Routes/CategoryRoutes';
import ProductsRouter from './Routes/ProductRoutes';

const app = express();

// Middleware
app.use(json());
app.use("/category", CategoryRoutes);
app.use("/products", ProductsRouter);

app.listen(5500, () => console.log('Server is Running..'));
