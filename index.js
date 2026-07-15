import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));












