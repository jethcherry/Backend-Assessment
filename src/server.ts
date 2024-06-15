import express, { json } from 'express';
import CategoryRoutes from './Routes/CategoryRoutes';
import ProductsRouter from './Routes/ProductRoutes';
import authRoutes from './Routes/authRoutes';

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/category", CategoryRoutes);
app.use("/products", ProductsRouter);
app.use("/auth", authRoutes);

app.listen(5500, () => console.log('Server is Running on port 5500'));
