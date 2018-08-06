const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_3U1oLcNUrCK0FaNjRGlIpMa5");
const exphbs = require("express-handlebars");

// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set static folder
app.use(express.static(`${__dirname}/public`));

// Routes
app.get("/", (req, res, next) => {
  res.render("home");
});

app.post("/checkout", (req, res, next) => {
  const amount = 2300;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "The beginners guide to C++",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => {
      res.render("success");
    });
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = app;
