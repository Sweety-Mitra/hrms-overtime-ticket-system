import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';

import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import overtimeRoutes from "./routes/overtimeRoutes.js";

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

(async () => {
    await db.sync();
})();

// middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: 'auto' }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(AuthRoute);
app.use("/api/overtime", overtimeRoutes);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});