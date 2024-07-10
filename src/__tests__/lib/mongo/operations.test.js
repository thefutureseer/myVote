const { MongoClient } = require('mongodb');
const { setupDB, teardownDB } = require('./helpers/dbHandler');

describe('MongoDB Operations', () => {
  let client;
  let db;

  beforeAll(async () => {
    const mongoUri = process.env.mongoSurveyDB;
    client = new MongoClient(mongoUri);

    await client.connect();
    db = client.db(); // Get the default database

    // Perform setup operations if needed
    await setupDB(); //  Initialize test data
  },8000);

  afterAll(async () => {
    await teardownDB(); // Clean up after tests
    await client.close();
  });

  it('should insert a document into collection', async () => {
    // Perform MongoDB operations
    const collection = db.collection('testCollection');
    await collection.insertOne({ name: 'Test User' });
    const insertedUser = await collection.findOne({ name: 'Test User' });

    expect(insertedUser.name).toBe('Test User');
  });
});