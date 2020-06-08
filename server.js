//Se importan dependencias
const http = require('http');
const express = require('express');
var cors = require('cors');

//Importa data de students
const studentsRouter = require('./routes/students');

//Crea una nueva aplicación y se instancia express
const app = express();
//Permite reconocer peticiones como un json
app.use(express.json());

/*
Se debe usar antes de todas las definiciones de rutas
Permitiendo que la URL a continuación acceda a estos API End-points
8100:TCP
*/
app.use(cors({origin: 'http://localhost:8100'}));

/* Estas rutas '/students' URL tienen dos End-points: 
→ localhost:3000/students/ (this returns array of objects)
→ localhost:3000/students/:id (this returns single object)
*/
app.use('/students', studentsRouter);

 //Ruta por defecto del API
app.use('/', function (req, res) {
  res.send('Hello World! :)');
  console.log("Server Status " + 200);
});

//Se crea un servidor http
const server = http.createServer(app);
//Se indica en que puerto se escucharán las peticiones
const port = 3000;
 
//Puerto por donde escucha el servidor las peticiones 
server.listen(port,() => console.log("Server Running on Port: " + port));
