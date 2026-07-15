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


// GET Semua Data

app.get('/biodata', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM biodata');

        res.status(200).json({
            message: 'Berhasil mengambil data biodata',
            data: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Gagal mengambil data',
            error: err.message
        });
    }
});


// GET Berdasarkan ID

app.get('/biodata/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM biodata WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Data ditemukan',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Terjadi kesalahan',
            error: err.message
        });
    }
});


// POST

app.post('/biodata', async (req, res) => {

    console.log(req.body); // Tambahkan ini

    try {
        const { id, nama, nim, kelas } = req.body;

        const result = await pool.query(
            `INSERT INTO biodata (id, nama, nim, kelas)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [id, nama, nim, kelas]
        );

        res.status(201).json({
            message: 'Data berhasil ditambahkan',
            data: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err); // Ubah menjadi ini
    }
});





