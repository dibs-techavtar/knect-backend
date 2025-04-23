import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from 'cors';
import {errorHandler} from '../src/middlewares/errorHandler.js'
const app = express()

/* Middlewares */
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Health Route
app.get('/health', (_req, res) => res.json({ ok: true }))


/* ───────────────── All API routes here ───────── */
// import apiRouter from './routes/index.js';
// app.use('/api/v1', apiRouter);


/* ───────────────── Error handler ─────────────── */
app.use(errorHandler)

export default app