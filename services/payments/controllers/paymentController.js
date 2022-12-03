const { Invoice, Log, InvoiceProduct } = require("../models/index");
const axios = require("axios");

class Controller {
  static async payment(req, res, next) {
    try {
      // console.log("ihza bubu");
      const { gross_amount } = req.body;
      // console.log(req.body);
      // console.log(new Date().toISOString());
      if (gross_amount === 0 || !gross_amount) {
        throw { name: "AMOUNT_CANNOT_EMPTY" };
      }
      let payload = JSON.stringify({
        transaction_details: {
          order_id: `ORDER - ${new Date().toISOString()}`,
          gross_amount,
        },
        credit_card: {
          secure: true,
        },
      });

      // console.log("bantalll");
      console.log(payload);
      const { data } = await axios.post(
        "https://app.sandbox.midtrans.com/snap/v1/transactions",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Basic U0ItTWlkLXNlcnZlci1qeUNjWDRHWWtVZEdVeFdYNzJmU0R6dU06",
          },
        }
      );
      // console.log(data);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
