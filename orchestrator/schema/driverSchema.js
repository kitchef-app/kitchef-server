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

type Driver {
  _id: ID,
  fullName: String
  username: String,
  password: String
  email: String,
  phoneNumber: String,
  address: String,
  location: location ,
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

input DriverForm {
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
  getDriverById(_id:Int): User,
}

type Mutation {
  registerDriver(driverInput: DriverForm): String
  loginDriver(driverLogin:LoginForm): LoginResult
  editTokenDriver(token: String,DriverId:Int): String

  
}
`;

const resolvers = {
  Query: {
    getDriverById: async (_, args) => {
      try {
        const { _id } = args;
        console.log(_id, "ini dari args by id");

        const { data } = await axios.get(`${userLocalhost}/users/${_id}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    registerDriver: async (_, args) => {
      const { driverInput } = args;
      console.log(driverInput);
      try {
        const { data } = await axios.post(
          `${userLocalhost}/users/register`,
          driverInput
        );

        console.log(data);
        return `success adding user with email ${data.email}`;
      } catch (error) {
        console.log(error);
      }
    },
    editTokenDriver: async (_, args) => {
      const { token, DriverId } = args;
      // console.log(userInput);
      console.log(args);
      try {
        const { data } = await axios.patch(
          `${userLocalhost}/drivers/${DriverId}`,
          {
            token,
          }
        );

        console.log(data);
        return `success edit`;
      } catch (error) {
        // console.log(error);
      }
    },

    loginDriver: async (_, args) => {
      const { driverLogin } = args;
      console.log(driverLogin);
      try {
        const { data } = await axios.post(
          `${userLocalhost}/drivers/login`,
          driverLogin
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
