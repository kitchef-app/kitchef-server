const axios = require("axios");
const Redis = require("ioredis");
const userLocalhost = "https://kitchef-server-production.up.railway.app";
// const userLocalhost = "http://localhost:3001";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type User {
  _id: ID,
  fullName: String
  username: String,
  password: String
  email: String,
  phoneNumber: String,
  address: String,
  location: location,
  id:ID
}
type location{
  type:String,
  coordinates:[String]
}

type LoginResult {
  access_token: String,
  email: String,
  role: String,
  id: Int
}

type Logs {
  UserId:Int,
  messageNotification: String
}

input UserForm {
  fullName: String,
  username: String,
  email: String,
  password: String,
  address: String,
  phoneNumber: String,
  longitude: String,
  latitude:String
}

input LoginForm {
  email: String,
  password: String,
}


type Query {
  getUserAll:[User]
  getUserById(_id:Int): User,
  getLogsByUserId(LogsUserId: ID): [Logs]
}

type Mutation {
  registerUser(userInput: UserForm): String
  loginUser(userLogin:LoginForm): LoginResult
}
`;

const resolvers = {
  Query: {
    getUserAll: async (_, args) => {
      try {
        // const { _id } = args;
        // console.log(_id, "ini dari args by id");
        const { data } = await axios.get(`${userLocalhost}/users`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getUserById: async (_, args) => {
      try {
        const { _id } = args;
        console.log(_id, "ini dari args by id");
        const { data } = await axios.get(`${userLocalhost}/users/${_id}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getLogsByUserId: async (_, args) => {
      const { LogsUserId } = args;
      try {
        const { data } = await axios.get(`${userLocalhost}/logs/${LogsUserId}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    registerUser: async (_, args) => {
      const { userInput } = args;
      console.log(userInput);
      try {
        const { data } = await axios.post(
          `${userLocalhost}/users/register`,
          userInput
        );

        console.log(data);
        return `success adding user with email ${data.email}`;
      } catch (error) {
        console.log(error);
      }
    },
    loginUser: async (_, args) => {
      const { userLogin } = args;
      console.log(userLogin);
      try {
        const { data } = await axios.post(
          `${userLocalhost}/users/login`,
          userLogin
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
