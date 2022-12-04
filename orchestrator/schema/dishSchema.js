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
  name: String,
  CategoryId: Int,
  videoUrl: String,
  description: String,
  imageUrl: String,
  listIngredients: [Ingredients],
  listTools: [Tools]
  steps:[steps]
}

type DishDetail {
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
  name: String,
  price: Int,
  stock: Int,
  imageUrl: String,
  description: String
}

type Tools {
  name: String
}

type Ingredients {
  name: String
}


type Query {
  getDishes(CategoryId:ID): [Dish],
  getDishesDetail(DishId:ID): DishDetail
}
`;

const resolvers = {
  Query: {
    getDishes: async (_, args) => {
      try {
        const { CategoryId } = args;
        console.log(args);
        const dataCache = await redis.get("dishes");
        if (dataCache) {
          console.log("masuk redis");
          // console.log(dataCache);
          return JSON.parse(dataCache);
        } else {
          console.log("no redis");
          const { data } = await axios.get(
            `${appLocalhost}/dishes?CategoryId=${CategoryId}`
          );
          await redis.set("dishes", JSON.stringify(data));

          return data;
        }
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
