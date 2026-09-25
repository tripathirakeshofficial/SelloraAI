declare module "*redis.js" {
  import type Redis from "ioredis";

  const redis: Redis;
  export default redis;
}
