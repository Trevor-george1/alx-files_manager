#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';
    const dburl = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(dburl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const files = await this.client.db(this.database).collection('files').countDocuments();
    return files;
  }
}

const dbClient = new DBClient();
export default dbClient;
