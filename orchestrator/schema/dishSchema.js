const axios = require("axios");
const Redis = require("ioredis");
const appLocalhost = "https://app-production-56fe.up.railway.app";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Dish {
  id: ID,
  name: String,
  CategoryId: Int,
  videoUrl: String,
  description: String,
  imageUrl: String,
  listIngredients: [Ingredients],
  listTools: [Tools]
}

type DishDetail {
  id: ID,
  name: String,
  CategoryId: Int,
  videoUrl: String,
  description: String,
  imageUrl: String,
  listIngredients: [Ingredients],
  listTools: [Tools]
  Products: [Product]
  steps:[steps]
} 
type steps{
  name:String
}

type Product {
  id: ID,
  name: String,
  price: Int,
  stock: Int,
  imageUrl: String,
  description: String
}

type Tools {
  id: ID,
  name: String
}

type Ingredients {
  id: ID,
  name: String
}


type Query {
  getDishes: [Dish],
  getDishesDetail(DishId:ID): DishDetail
}
`;

const resolvers = {
  Query: {
    getDishes: async (_, args) => {
      const { CategoryId } = args;
      console.log(args);
      try {
        const { data } = await axios.get(
          `${appLocalhost}/dishes?CategoryId=${CategoryId}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getDishesDetail: async (_, args) => {
      const { DishId } = args;
      console.log(args);
      try {
        const { data } = await axios.get(`${appLocalhost}/dishes/${DishId}`);
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
