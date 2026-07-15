import express from 'express';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswaku',
    password: '5k3batang',
    port: 5432,
});

pool.connect()
    .then(() => console.log('Koneksi ke PostgreSQL berhasil!'))
    .catch(err => console.error('Koneksi gagal:', err));










