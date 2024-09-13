const express = require('express')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 4000;

const allowedOrigins = ['https://admin-dashboard-e-commerce.netlify.app/', 'https://e-commerce-baroque-clone.netlify.app/'];

// CORS options ko configure karen
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));


var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'));

app.set('secretKey', "e-commerce");

require('./Env/Connection')

const productRoute = require('./Routes/Products')

const productController = require('./App/Api/Controllers/productController')
const router = express.Router();
router.post('/getProductsByIds', productController.getProductsByIds)
app.use('/Products', router);

app.use('/Products', validateUser, productRoute);

const categoryRoute = require('./Routes/Categories');
app.use('/Category', validateUser, categoryRoute);

const featuredRoute = require('./Routes/Featured');
app.use('/Featured', validateUser, featuredRoute);

const orderRoute = require('./Routes/ordersRoute');
app.use('/Order', orderRoute);
// app.use('/Order', validateUser, orderRoute);

const userRoute = require('./Routes/userRoute')
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send("Server running")
})

function validateUser(req, res, next) {
  if (req.method === 'GET') {
    next();
    return;
  }
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ 'Status': "Authorization", message: err.message })
    }
    else {
      //  req.body.id = decoded._id
      next()
    }
  })
}

app.listen(PORT, () => {
  console.log(`Your server is running on port # ${PORT}`);
})