const axios = require("axios");
const Redis = require("ioredis");
const paymentLocalhost = "http://localhost:3002";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});

const typeDefs = `#graphql

type Invoice {
  UserId: Int,
  DriverId: Int,
  total: Int,
  isPaid: String,
  isDelivered: String,
  subTotal: Int,
  shippingCost: Int
}

input InvoiceForm {
  UserId: Int,
  DriverId: Int,
  total: Int,
  subTotal: Int,
  shippingCost: Int,
  cart: [cart]
}

input cart{
  InvoiceId:Int,
  ProductId:Int,
  total:Int
}

type Query {
  getInvoiceUser(UserId:ID): Invoice,
  getInvoiceDriver(DriverId:ID): Invoice,
}
type Mutation {
  addInvoice(invoiceInput: InvoiceForm): String
  changeStatusInvoice(InvoiceId:ID): String
  changeStatusDeliveryInvoice(InvoiceDelId:ID): String
}
`;

const resolvers = {
  Query: {
    getInvoiceUser: async (_, args) => {
      const { UserId } = args;
      console.log(args);
      try {
        const { data } = await axios.get(`${paymentLocalhost}/invoices/users/${UserId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getInvoiceDriver: async (_, args) => {
      const { DriverId } = args;
      console.log(args);
      try {
        const { data } = await axios.get(`${paymentLocalhost}/invoices/drivers/${DriverId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addInvoice: async (_, args) => {
      const { invoiceInput } = args;
      try {
        const { data } = await axios.post(`${paymentLocalhost}/invoices`, invoiceInput);

        return "Success adding invoice";
      } catch (error) {
        console.log(error);
      }
    },
    changeStatusInvoice: async (_, args) => {
      const { InvoiceId } = args;
      try {
        const { data } = await axios.put(`${paymentLocalhost}/invoices/statusPaid/${InvoiceId}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    changeStatusDeliveryInvoice: async (_, args) => {
      const { InvoiceDelId } = args;
      try {
        const { data } = await axios.put(`${paymentLocalhost}/invoices/statusDeliveredComplete/${InvoiceDelId}`);

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