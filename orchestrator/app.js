const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3004;
const usersSchema = require("./schema/userSchema");
const driversSchema = require("./schema/driverSchema");

const server = new ApolloServer({
  typeDefs: [usersSchema.typeDefs, driversSchema.typeDefs],
  resolvers: [usersSchema.resolvers, driversSchema.resolvers],
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log("server ready at " + url);
});
