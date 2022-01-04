
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/short-url';

async function connect() {
  try {
    await mongoose.connect(mongoUrl);
    return mongoose.connection;
  } catch (error) {
    return error;
  }
}

function disconnect() {
  return mongoose.disconnect();
}

export default { connect, disconnect };
