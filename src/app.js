import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import folderRoutes from './routes/folder.routes.js';
import fileRoutes from './routes/file.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/folders', folderRoutes); 
app.use('/api/admin', adminRoutes);

export default app;
