const axios = require("axios");
const Redis = require("ioredis");
const paymentLocalhost = "http://localhost:3002";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Payment {
  token: String,
  redirect_url:String
}

input PaymentForm {
  gross_amount: Int,
}


type Mutation {
  payment(paymentInput: PaymentForm): Payment
}
`;

const resolvers = {
  Mutation: {
    payment: async (_, args) => {
      const { paymentInput } = args;
      console.log(paymentInput);
      try {
        const { data } = await axios.post(`${paymentLocalhost}/payment`, paymentInput);

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
