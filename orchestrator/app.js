const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3004;
const usersSchema = require("./schema/userSchema");
const driversSchema = require("./schema/driverSchema");
const categorySchema = require("./schema/categorySchema");
const dishSchema = require("./schema/dishSchema");

const server = new ApolloServer({
  typeDefs: [usersSchema.typeDefs, driversSchema.typeDefs, categorySchema.typeDefs, dishSchema.typeDefs],
  resolvers: [usersSchema.resolvers, driversSchema.resolvers, categorySchema.resolvers, dishSchema.resolvers],
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log("server ready at " + url);
});
