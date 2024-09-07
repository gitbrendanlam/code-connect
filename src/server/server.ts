import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { google, calendar_v3 } from 'googleapis';
const { OAuth2 } = google.auth;

// Define types for request body
interface EventRequestBody {
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence?: string[];
  attendees?: { email: string }[];
  reminders?: {
    useDefault: boolean;
    overrides?: { method: string; minutes: number }[];
  };
  colorId?: string;
}

// Validate environment variables
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.REDIRECT_URI || !process.env.REFRESH_TOKEN) {
  throw new Error('Missing environment variables');
}

// oAuth2Client setup
const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.POSTGRES_URI;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set credentials with refresh token
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

// Middleware to parse incoming JSON data
app.use(express.json());

// Create Google Calendar instance
const calendar = google.calendar({
  version: 'v3',
  auth: oAuth2Client
});

// POST route to create an event
app.post('/api/create-event', async (req: Request, res: Response) => {
  try {
    // Destructure the incoming request body to get individual fields
    let { summary, location, description, start, end, recurrence, attendees, reminders, colorId }: EventRequestBody = req.body;
    console.log('request received @ /api/create-event', req.body);
   
    // Construct the event object using the destructured values
    const event: calendar_v3.Schema$Event = {
      summary,
      location,
      description,
      start: {
        dateTime: start.dateTime + 'Z',
        timeZone: 'America/Chicago'
      },
      end: {
        dateTime: end.dateTime + 'Z',
        timeZone: 'America/Chicago'
      },
      recurrence,
      attendees,
      reminders,
      colorId
    };

    // Create the event in Google Calendar
    const eventRes = await calendar.events.insert(
      {
        calendarId: 'primary', // or any specific calendar ID
        requestBody: event,
      });

      console.log('Event created: %s', eventRes.data.htmlLink);
      return res.status(200).send(`Event created: ${eventRes.data.htmlLink}`);

    } catch (err) {
      console.error('Calendar Event Creation Error: ', err);
      return res.status(500).send('There was an error creating the event.');
    }
  });

app.get('/api/test', (req,res) => {
  console.log('ACCESSING VIA BUTTON')
  const data = { message: 'Hello from the backend!' };
    res.status(200).json(data);
})

// POST route to create a new group
app.post('/api/group-form', async (req, res) => {

console.log('POST request made')

  const { group_name, group_description, invites } = req.body;

  try {
    // Insert the new group into the App_Groups table
    const result = await pool.query(
      'INSERT INTO App_Groups (group_name, group_description) VALUES ($1, $2) RETURNING group_id',
      [group_name, group_description]
    );

    const groupId = result.rows[0].group_id;

    // Handle invite logic if necessary (e.g., inserting invites into another table)
    // Example: Insert invites into a Group_Invites table (if it exists)
    // if (invites && invites.length > 0) {
    //   const inviteQueries = invites.map((invite : string[]) =>
    //     pool.query(
    //       'INSERT INTO Group_Invites (group_id, invitee) VALUES ($1, $2)',
    //       [groupId, invite]
    //     )
    //   );
    //   await Promise.all(inviteQueries);
    // }

    res.status(201).json({ message: 'Group created successfully'});
  } catch (err) {
    console.error('Error inserting group:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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