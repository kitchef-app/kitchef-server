const axios = require("axios");
const Redis = require("ioredis");
const appLocalhost = "https://app-production-56fe.up.railway.app";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Product {
  id: ID,
  name: String,
  price: Int,
  stock: Int,
  satuan: String,
  imageUrl: String,
  description: String
}

input Total {
  total: Int
}

type Query {
  getProducts: [Product],
}


type Mutation {
  editProductStock(ProductId:ID, total:Total): String
}
`;

const resolvers = {
  Query: {
    getProducts: async () => {
      try {
        const { data } = await axios.get(`${appLocalhost}/products`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    editProductStock: async (_, args) => {
      const { ProductId, total } = args;
      console.log(args);
      try {
        const { data } = await axios.put(
          `${appLocalhost}/products/stok/${ProductId}`,
          total
        );

        console.log(data);
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
