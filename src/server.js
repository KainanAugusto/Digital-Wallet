import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(json());
app.use(authRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});