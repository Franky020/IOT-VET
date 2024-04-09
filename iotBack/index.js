const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express(); // Aquí se inicializa 'app'


dotenv.config()
// const { MongoClient, ServerApiVersion } = require('mongodb');

//CORS
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,PUT,POST,PATCH,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
));

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.bylz3ai.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_NAME}`;
// const bodyParser = require("body-parser")

mongoose.connect(uri)

mongoose.connection.on("error", function(error){
  console.log(error);
})

mongoose.connection.on("open", function(){
  console.log("se concecto de manera correcta a la base de datos");
})

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('My server');
})

app.use(require("./rutas/componentes/componentes"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

const puerto = process.env.PORT || 3000;
app.listen(puerto, ()=>{
    console.log(`El servidor esta en el puerto ${puerto}`)
});

app.get('/api', (req, res) => {
  return res.send({'message': 'Hola REST API'});
})

