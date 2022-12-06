const axios = require("axios");
const Redis = require("ioredis");
const paymentLocalhost = "https://dandy-partner-production.up.railway.app";
const userLocalhost = "https://kitchef-server-production.up.railway.app";
const appLocalhost = "https://app-production-56fe.up.railway.app";
// const appLocalhost = "http://localhost:3003";

// const paymentLocalhost = "http://localhost:3002";

const redis = new Redis({
  host: "redis-18717.c299.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  port: 18717,
  password: "JyJif0KTEPz4ITRk1XbeVrJEbEESudWN",
});
// const redis = require("../config/redis");
const typeDefs = `#graphql

type Invoice {
  id: ID,
  UserId: Int,
  DriverId: Int,
  total: Int,
  isPaid: String,
  isDelivered: String,
  subTotal: Int,
  shippingCost: Int
  createdAt:String
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
  ProductId:Int,
  total:Int
}

type InvoiceId{
  InvoiceId:Int
}

type Logs {
  UserId: Int,
  messageNotification: String
}


type Query {
  getInvoiceById(Id:Int): Invoice,
  getInvoiceUser(UserId:Int): [Invoice],
  getInvoiceDriver(DriverId:Int): [Invoice],
  getLogs(UserIdLogs:Int): [Logs]
}

type Mutation {
  addInvoice(invoiceInput: InvoiceForm): Invoice
  changeStatusInvoice(InvoiceId:Int): String
  changeStatusDeliveryInvoice(InvoiceDelId:Int): String
}
`;

const resolvers = {
  Query: {
    getInvoiceById: async (_, args) => {
      const { Id } = args;
      console.log(Id);
      try {
        const { data } = await axios.get(`${paymentLocalhost}/invoices/${Id}`);

        console.log(data);
        return data;
      } catch (error) {
        // console.log(error);
      }
    },
    getInvoiceUser: async (_, args) => {
      const { UserId } = args;
      // console.log(UserId);
      try {
        const { data } = await axios.get(
          `${paymentLocalhost}/invoices/users/${UserId}`
        );

        console.log(data);
        return data;
      } catch (error) {
        // console.log(error);
      }
    },
    getInvoiceDriver: async (_, args) => {
      try {
        const { DriverId } = args;
        // console.log(args);
        // console.log(DriverId);
        // const dataCache = await redis.get("invoices");
        // if (dataCache) {
        //   console.log("masuk redis");
        //   // console.log(dataCache);
        //   return JSON.parse(dataCache);
        // } else {
        //   console.log("masuk no redis");
        //   const { data } = await axios.get(`${paymentLocalhost}/invoices/drivers/${DriverId}`);
        //   await redis.set("invoices", JSON.stringify(data));

        //   return data;
        // }
        console.log(args);
        const { data } = await axios.get(
          `${paymentLocalhost}/invoices/drivers/${DriverId}`
        );

        return data;
      } catch (error) {
        // console.log(error);
      }
    },
    getLogs: async (_, args) => {
      const { UserIdLogs } = args;
      try {
        const { data } = await axios.get(`${userLocalhost}/logs/${UserIdLogs}`);

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
        // console.log(args);
        const { data: Invoice } = await axios.post(
          `${paymentLocalhost}/invoices`,
          invoiceInput
        );
        // const newCart =
        console.log(Invoice.id);
        const newCart = invoiceInput.cart;
        // newCart.InvoiceId = Invoice.id;
        newCart.forEach((el) => {
          el.InvoiceId = Invoice.id;
        });
        // console.log(newCart);
        // console.log(invoiceInput.cart);
        // const newCart = invoiceInput
        const { data } = await axios.post(
          `${appLocalhost}/products/invoiceProduct`,
          { cart: newCart }
        );
        // console.log(Invoice);
        // const { data: InvoiceById } = await axios.get(
        //   `${paymentLocalhost}/invoices/users/${Invoice.InvoiceId}`
        // );
        // console.log("lontong");
        // console.log(Invoice.invoice.UserId);

        const { data: Logs } = await axios.post(`${userLocalhost}/logs`, {
          UserId: Invoice.UserId,
          messageNotification: `order is being prepared, order status is none (waiting for payment)`,
        });
        // console.log(Logs);
        // await redis.del("invoices");
        console.log(Invoice);
        return Invoice;
      } catch (error) {
        // console.log(error);
      }
    },
    changeStatusInvoice: async (_, args) => {
      const { InvoiceId } = args;
      try {
        console.log(args);
        const { data: Invoice } = await axios.put(
          `${paymentLocalhost}/invoices/statusPaid/${InvoiceId}`
        );

        const { data: Logs } = await axios.post(`${userLocalhost}/logs`, {
          UserId: InvoiceId,
          messageNotification: `order status is on going`,
        });

        // await redis.del("invoices");
        return "invoice successs";
      } catch (error) {
        console.log(error);
      }
    },
    changeStatusDeliveryInvoice: async (_, args) => {
      const { InvoiceDelId } = args;
      try {
        const { data: Invoice } = await axios.put(
          `${paymentLocalhost}/invoices/statusDeliveredComplete/${InvoiceDelId}`
        );

        // await redis.del("invoices");
        const { data: Logs } = await axios.post(`${userLocalhost}/logs`, {
          UserId: InvoiceDelId,
          messageNotification: `your order is Complete`,
        });

        return "invoice successs";
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
