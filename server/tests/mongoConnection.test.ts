export { };

const mongoose = require('mongoose')
const connectTestingDB = require('../utils/testingEnvironment').connectDB

beforeAll(async () => {
  await connectTestingDB()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('connections are up and running', () => {
  test('correct database name', async () => {
    const connectionName = await mongoose.connection.name
    expect(connectionName).toBe(process.env.TEST_DB_NAME)
  })
})
