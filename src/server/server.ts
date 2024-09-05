import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.POSTGRES_URI;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection configuration using ElephantSQL details
const pool = new Pool({
  connectionString: SECRET_KEY,
  ssl: { rejectUnauthorized: false }, // Ensure SSL connection
});

// Initialize the database with the schema
const initializeDatabase = async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../server/db.sql'), 'utf-8');
    await pool.query(schema);
    console.log('Database initialized with schema');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to ElephantSQL database');
  release();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to test server
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running and connected to the database!');
});

// Example route to fetch data from the database
app.get('/status', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM App_Users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the Express server
app.listen(PORT, () => {
  initializeDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});