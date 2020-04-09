const mongoose = require('mongoose');
const config = require('config');
const DB = config.get('MONGO_URI');


const connectDb = async () => {
  try {
    const conn = await mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log(`Mongo connected to ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}


module.exports = connectDb;