import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log(`Connected to MongoDB!`);
})
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server is running on the port 3000!`)
});

app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);
// app.use('/server/listing', listingRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// MiddleWare
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});