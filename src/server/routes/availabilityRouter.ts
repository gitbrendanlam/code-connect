// Package dependencies
import { Request, Response } from "express";
const express = require('express');
const router = express.Router();
// const { createUser, getUser } = require('./../controllers/userController.js')

router.post('/add', (req: Request, res: Response) => {
  res.status(200).json('successful login');
});

router.get('/get', (req: Request, res: Response) => {
  res.status(200).json('successful login');
});

router.delete('/delete', (req: Request, res: Response) => {
  res.status(200).json('successful login');
});

module.exports = router;