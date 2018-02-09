import supertest from 'supertest';
import chai from 'chai';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import token from 'jsonwebtoken';
import exp from '../../app.js';
import db from '../../models/index.js';

dotenv.config();
export const defaultPassword = 'test123';
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(defaultPassword, salt);

export const app = exp;
export const request = supertest(app);
export const {
  expect
} = chai;
export const {
  User, Center, Event
} = db;

export const jwt = token;

export const defaultUser = {
  id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
  userName: 'admin',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'ad.min@gmail.com',
  passwordHash,
  isAdmin: true
};
export const defaultCenter = {
  id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
  name: 'Baranduil',
  description: 'a  dark and dank castle shrouded in gloom',
  cost: 50000,
  capacity: 5000,
  country: 'Algeria',
  state: 'Lagos',
  lga: 'Oshodi',
  amenities: ['Pool', 'Bar'],
  eventType: ['Cocktail', 'Birthday'],
  userId: defaultUser.id
};
export const rootURL = '/api/v1';
export const payload = {
  isAdmin: defaultUser.isAdmin,
  id: defaultUser.id
};