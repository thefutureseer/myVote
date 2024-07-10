require('dotenv').config();

const { MongoClient } = require('mongodb');

let client;
let db;

beforeAll(async () => {
  const mongoUri = process.env.mongoSurveyDB;
  client = new MongoClient(mongoUri);

  await client.connect();
  db = client.db(); // Get the default database
}, 8000); // Increased timeout to 10 seconds (if necessary)

afterAll(async () => {
  if (client) {
    await client.close();
  }
});