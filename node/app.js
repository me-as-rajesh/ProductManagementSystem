const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = 3005
const router = require('./routers')

app.use(bodyParser.urlencoded({ extended: false }))
const cors =require('cors')
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('./uploads'))

mongoose.connect('mongodb://127.0.0.1:/ProductManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log(err));


app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


