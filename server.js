require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const connectDB = require("./config/db");
const passport = require("passport")
const session = require("express-session");
const userModel = require("./model/userModel");
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const cookieParcer = require("cookie-parser")
const crypto = require("crypto");
const path = require("path");
const { senitizeUser, isAuth, cookieExtractor } = require("./service/common");


const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY; //ToDo:save thie env file
var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;
app.use(express.static(path.resolve(__dirname, "dist")))
app.use(cookieParcer())
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
  cookie: {
    secure: true
  }
}))
app.use(passport.initialize())
app.use(passport.authenticate('session'));
app.use(cors({
  exposedHeaders: ['X-Total-Count'],
  credentials: true, origin: 'http://localhost:3000'
}))
app.use(express.json())

//routes
app.use("/products", isAuth(), require("./routes/productsRoutes"))
app.use("/category", isAuth(), require("./routes/categoryRoutes"))
app.use("/brands", isAuth(), require("./routes/brandRoutes"))
app.use("/users", isAuth(), require("./routes/userRoutes"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/cart", isAuth(), require("./routes/cartRoutes"))
app.use("/orders", isAuth(), require("./routes/orderRoutes"))

app.get("*",(req,res)=>res.sendFile(path.resolve('dist','index.html')))

//passport authentication
passport.use('local', new LocalStrategy({
  usernameField: 'email',
},
  async function (username, password, done) {
    try {
      const user = await userModel.findOne({ email: username });
      if (!user) {
        done(null, false, { message: 'no such user email' });
      }
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256',async function (err, hashedPassword) {
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        const token = jwt.sign(senitizeUser(user), SECRET_KEY);
        done(null, { id: user.id, name: user.name, addresses: user.addresses, role: user.role, token });
      });
    }
    catch (err) {
      done(err)
    }
  }
))
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await userModel.findById(jwt_payload.id);
    if (user) {
      return done(null, senitizeUser(user)); //this call serilizer
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

// create session varibales ko req.user
passport.serializeUser(function (user, cb) {
  // console.log("serialize",user)

  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role, addresses: user.addresses });
  });
});


//request krta hai req.user ko banata hai
passport.deserializeUser(function (user, cb) {
  // console.log("Deserialize", user)

  process.nextTick(function () {
    return cb(null, user);
  })
});

//payments
const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

const calculateOrderAmount = (items) => {
  return 1400;
}

app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;
  const { totalAmount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount * 100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true
    }
  })
  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})
// Webhook

// TODO: we will capture actual order after deploying out server live on public URL

// const endpointSecret = "whsec_0e1456a83b60b01b3133d4dbe06afa98f384c2837645c364ee0d5382f6fa3ca2";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       console.log({paymentIntentSucceeded})
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });
//Database connection
connectDB();

//list port
const PORT = process.env.PORT;
app.listen(PORT, console.log(`your server running at ${PORT}`))