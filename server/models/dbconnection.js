import mongoose from 'mongoose';

const DB_URI=process.env.DB_URI;

const dbconnection = mongoose.connect(DB_URI)
  .then(() => {
    console.log('DB is connected...');
    return mongoose.connection;
  })
  .catch((err) => {
    console.log(`Error while connecting DB ${err}`);
    throw err;
  });

export default dbconnection;