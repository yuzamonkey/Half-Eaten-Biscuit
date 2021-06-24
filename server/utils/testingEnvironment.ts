export { };

require('dotenv').config()
const mongoose = require('mongoose')

const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

export const connectDB = async () => {
  console.log('(TEST) connecting to', TEST_MONGODB_URI)
  try {
    const connection = await mongoose.connect(TEST_MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false, 
      useCreateIndex: true 
    })
    console.log('connected to MongoDB test env');
    return connection
  } catch (err) {
    console.log('Failed to connect to MongoDB', err);
  }
}

//connectDB()
