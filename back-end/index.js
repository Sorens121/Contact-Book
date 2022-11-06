import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import registerRoute from './routes/register.js';
import loginRoute from './routes/auth.js';
import userRoute from './routes/api/users.js';
import refreshRoute from './routes/refresh.js';
import contactsRouter from './routes/api/contacts.js';
import logoutRoute from './routes/logout.js';
import adminRoute from './routes/api/admin.js';
import profileRoute from './routes/api/profile.js';
import { corsOptions } from './config/corsOptions.js';
import { credentials } from './middleware/credentials.js';
import verifyJWT from './middleware/verifyToken.js';

const app = express();

dotenv.config();

// Handle options credentials check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cross origin resourse sharing
app.use(cors(corsOptions));

// built in middleware for json
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

//routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);
//app.use('/api/refresh', refreshRoute);
app.use('/api/logout', logoutRoute);

//protected routes
app.use(verifyJWT);
app.use('/api/users', userRoute);
app.use('/api/users', contactsRouter);
app.use('/api/admin', adminRoute);
app.use('/api/profile', profileRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected successfully!'))
    .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));