<<<<<<< HEAD
import dotenv from 'dotenv';
const express = require('express');
=======
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
>>>>>>> origin/dev

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

<<<<<<< HEAD
app.user(express.json());
=======
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
app.post('/create-event', async (req: Request, res: Response) => {
  try {
    // Destructure the incoming request body to get individual fields
    const { summary, location, description, start, end, recurrence, attendees, reminders, colorId }: EventRequestBody = req.body;

    // Construct the event object using the destructured values
    const event: calendar_v3.Schema$Event = {
      summary,
      location,
      description,
      start: {
        dateTime: start.dateTime,
        timeZone: start.timeZone
      },
      end: {
        dateTime: end.dateTime,
        timeZone: end.timeZone
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

>>>>>>> origin/dev
// set up the server to listen for http requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
