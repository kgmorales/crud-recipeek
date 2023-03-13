import mongoose from 'mongoose';
import Recipe from './model/Recipe';
import url from '../config/db.config';

const db = connect(url, { useNewUrlParser: true });
db.mongoose = mongoose;
db.recipes = await import('./paprika.model.js');
// // const db = {};
// // db.mongoose = mongoose;
// // db.url = dbConfig.url;
// db.tutorials = await import('./tutorial.model.js')(mongoose);
// db.recipes = await import('./paprika.model.js')(mongoose);

// export default db;
