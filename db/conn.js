var MongoClient = require("mongodb").MongoClient;
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let db;

async function connectToDatabase() {
  try {
    const conn = await client.connect();
    db = conn.db("sample_training");
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

connectToDatabase();

function getDb() {
  if (!db) {
    throw new Error("Database connection is not established");
  }
  return db;
}

module.exports = { connectToDatabase, getDb };