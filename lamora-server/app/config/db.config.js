import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

module.exports = {
	url: process.env.MONGODB_URL,
};
