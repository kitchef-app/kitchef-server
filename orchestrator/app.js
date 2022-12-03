const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const port = process.env.PORT || 3004;
const usersSchema = require("./schema/userSchema");
const driversSchema = require("./schema/driverSchema");
const categorySchema = require("./schema/categorySchema");
const dishSchema = require("./schema/dishSchema");
const invoicesSchema = require("./schema/invoiceSchema");
const paymentsSchema = require("./schema/paymentSchema");
const productSchema = require("./schema/productSchema");

const server = new ApolloServer({
  typeDefs: [usersSchema.typeDefs, driversSchema.typeDefs, categorySchema.typeDefs, dishSchema.typeDefs, invoicesSchema.typeDefs, paymentsSchema.typeDefs, productSchema.typeDefs],
  resolvers: [usersSchema.resolvers, driversSchema.resolvers, categorySchema.resolvers, dishSchema.resolvers, invoicesSchema.resolvers, paymentsSchema.resolvers, productSchema.resolvers],
});

startStandaloneServer(server, {
  listen: { port },
}).then(({ url }) => {
  console.log("server ready at " + port);
});
