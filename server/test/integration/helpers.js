import supertest from 'supertest';
import chai from 'chai';
import dotenv from 'dotenv';
import token from 'jsonwebtoken';
import exp from '../../app.js';
import db from '../../models/index.js';

dotenv.config();

export const app = exp;
export const request = supertest(app);
export const { expect } = chai;
export const { Center } = db;
export const { User } = db;
export const { Event } = db;
export const jwt = token;

