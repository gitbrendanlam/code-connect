import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection configuration using ElephantSQL details
const pool = new Pool({
  connectionString: 'postgres://yphjsrmt:ThN80J8FETf_GMKYLDnQ03UGUSQL126A@raja.db.elephantsql.com/yphjsrmt', // Replace with your actual ElephantSQL URL
  ssl: { rejectUnauthorized: false }, // Ensure SSL connection
});

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
    const result = await pool.query('SELECT * FROM USER');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});