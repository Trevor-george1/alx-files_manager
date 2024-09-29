import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(error);
    });
    this.client.on('connect', () => {
    });
  }

  isAlive() {
    try {
      const result = this.client.ping();
      // console.log('PING result:', result);
      return result === 'PONG';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async get(key) {
    try {
      const result = this.client.get(key);
      return result || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async set(key, value, dur) {
    try {
      await this.client.set(key, value, 'EX', dur);
    } catch (error) {
      console.log(error);
    }
  }

  async del(key) {
    try {
      const result = await this.client.del(key);
      return result;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
