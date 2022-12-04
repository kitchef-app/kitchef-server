const axios = require("axios");
const Redis = require("ioredis");
const appLocalhost = "https://app-production-56fe.up.railway.app";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Category {
  name: String,
  imageUrl: String,
}


type Query {
  getCategory: [Category],
}
`;

const resolvers = {
  Query: {
    getCategory: async () => {
      try {
        const dataCache = await redis.get("categories");
        if (dataCache) {
          console.log("masuk redis");
          // console.log(dataCache);
          return JSON.parse(dataCache);
        } else {
          console.log("no redis");

          const { data } = await axios.get(`${appLocalhost}/categories`);
          await redis.set("categories", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
