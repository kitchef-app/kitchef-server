const axios = require("axios");
const Redis = require("ioredis");
const appLocalhost = "http://localhost:3003";

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
        const { data } = await axios.get(`${appLocalhost}/categories`);
        return data;
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