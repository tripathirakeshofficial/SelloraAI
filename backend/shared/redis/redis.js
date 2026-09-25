import Redis from "ioredis";

// Shared Redis client used for sessions and other backend state.
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("redis error: ", error);
});

export default redis;
