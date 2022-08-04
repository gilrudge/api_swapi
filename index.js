const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


const routes = require('./src/routes/routes');
const app = express();
dotenv.config({path:'.env'});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(process.env.PORT,() => {
  console.log(`Server running at port = ${process.env.PORT}`)
});