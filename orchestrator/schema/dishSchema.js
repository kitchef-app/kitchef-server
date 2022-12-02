const axios = require("axios");
const Redis = require("ioredis");
const appLocalhost = "http://localhost:3003";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Dish {
  name: String,
  CategoryId: Int,
  videoUrl: String,
  description: String,
  imageUrl: String,
  listIngredients: [Ingredients],
  listTools: [Tools]
}

type Tools {
  name: String
}

type Ingredients {
  name: String
}


type Query {
  getDishes(CategoryId:ID): [Dish],
}
`;

const resolvers = {
  Query: {
    getDishes: async (_, args) => {
      const { CategoryId } = args;
      console.log(args);
      try {
        const { data } = await axios.get(`${appLocalhost}/dishes?CategoryId=${CategoryId}`);
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
