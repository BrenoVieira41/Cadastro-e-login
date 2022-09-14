import express from 'express';
import UserRoutes from './resources/User/routes';
import AuthRoutes from './resources/Auth/routes';

const app = express();
app.use(express.json());
app.use(UserRoutes);
app.use(AuthRoutes);

export { app };
