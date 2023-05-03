// this is in node js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    process.env.REACT_APP_STRIPE_SECRET_KEY,
);

// API

// APP CONFIG
const app = express();
// MIDDLEWARES
app.use(cors({origin: true}));
app.use(express.json());

// API ROUTES
app.get("/", (request, response) => response.status(200).send("hello world"));

// receive the total amount from the quer
// y, create a payment intent on stripe with the total received
// after creating stripe payment we send the response back
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received BOOM! for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  console.log("TOTAL >>>>>>>>>>>>>>>>>>>>>>", total);
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// LISTEN COMMAND
exports.api = functions.https.onRequest(app);

// example endpoint
// http://127.0.0.1:5001/memag-2c50c/us-central1/api

// npx kill-port 3000 5000 etc
