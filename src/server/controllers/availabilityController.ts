import { Request, Response, NextFunction } from "express";
import { pool } from "./../server";

const availabilityController: any = {};

// To handle setting cookies for OAUTH users
availabilityController.addAvailability = async (req: Request, res: Response, next: NextFunction) => {
  const [user_id, date, week_day, start_time, recurring] = req.body;
  try {
    const result = await pool.query(`INSERT INTO App_Availability (user_id, date, week_day, start_time, recurring) VALUES (user_id, ${date}, ${week_day}, ${start_time}, ${recurring})`);
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
}

availabilityController.deleteAvailability = (req: Request, res: Response, next: NextFunction) => {
  return next();
}

module.exports = availabilityController;