import { config } from 'dotenv';
import { ConnectOptions } from 'mongoose';

config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;
const PAPRIKA_USER = process.env.PAPRIKA_USER;
const PAPRIKA_PASS = process.env.PAPRIKA_PASS;

const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions;

export default { MONGODB_URL, PAPRIKA_USER, PAPRIKA_PASS, PORT, mongooseOptions };
