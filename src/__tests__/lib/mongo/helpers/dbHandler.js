const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let mongod, client;

/**
 * Setup a MongoDB in-memory server and connect a client to it.
 * @returns {Promise<void>}
 */
async function setupDB() {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
}

/**
 * Disconnect the MongoDB client and stop the in-memory server.
 * @returns {Promise<void>}
 */
async function teardownDB() {
  await client.close();
  await mongod.stop();
}

module.exports = { setupDB, teardownDB };