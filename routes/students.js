//Importaciones requeridas
const express = require('express');
// create new router
const router = express.Router();

// JSON students array
let students = [
    { id: 1, name: 'Alexander Almengor', age: 22, university: 'UTP' },
    { id: 2, name: 'Armando Almengor', age: 22, university: 'UTP' },
];

//Métodos HTTP || End-points

//CREATE
//Agrega un nuevo objecto a la lista
router.post('/', function (req, res) {

    if (req.body) {
        //Obtiene el último id del arreglo
        let lastStudent = students[students.length - 1];

        // create an object of new Item
        let newStudent = {
            id: lastStudent.id + 1, // Se obtiene el último id y se le suma 1
            name: req.body.name,
            age: req.body.age,
            university: req.body.university
        };

        // Se guarda el nuevo objeto dentro del arreglo
        students.push(newStudent);

        // Se retorna 201 (creado correctamente) si existe información recibida, en caso contrario 204
        res.status(201).json(newStudent);
        console.log("Server Status " + 201);
    } else {
        res.status(204);
        console.log("Server Status " + 204);
    }

});

//READ
// este end-point del API retorna un JSON array con los estudiantes
router.get('/', function (req, res) {
    
    try {
        res.status(200).json(students);
        console.log("Server Status " + 200);
    } catch(err) {
        res.status(400);
        console.log("Server Status " + 400);
    }

});

// este end-point retorna un objecto del arreglo students buscando por id
// Se obtiene un `id` a través de get desde el url del end-point
router.get('/:id', function (req, res) {

    // Busca un objeto dentro del arreglo `students` por `id`
    let found = students.find(function (student) {
        return student.id === parseInt(req.params.id);
    });

    // Si se encuentra el objeto se retorna un objeto, sino se devuelve un error 404
    if (found) {
        res.status(200).json(found);
        console.log("Server Status " + 200);

    } else {
        res.sendStatus(404);
        console.log("Server Status " + 404);
    }

});

//UPDATE
// Este End-point actualiza si existe el registro dentro del arreglo
// Para esto se necesita el 'id' desde el api end-point del estudiante to update
router.put('/:id', function (req, res) {

    // Obtiene el estudiante con el id recibido a través de la petición put
    let studentFound = students.find(function (student) {
        return student.id === parseInt(req.params.id);
    });

    // Valida si el estudiante fue encontrado
    if (studentFound) {

        let studentupdated = {
            id: studentFound.id,
            name: req.body.name, // Se establece el valor de name recibido desde el request
            age: req.body.age, // Se establece el valor de age recibido desde el request
            university: req.body.university // Se establece el valor de university recibido desde el request
        };

        // Busca dentro del arreglo estudiantes el índice que se desea actualizar
        let targetIndex = students.indexOf(studentFound);

        // Se actualiza el objeto identificado previamente
        students.splice(targetIndex, 1, studentupdated);

        // Retorna 204 si se actualiza corretamente, en caso contrario 404 (no encontrado)
        res.sendStatus(204);
        console.log("Server Status " + 204);

    } else {
        res.sendStatus(404);
        console.log("Server Status " + 404);
    }

});

//DELETE
// Este End-Point buscsa por id un estudiante existente dentro del arreglo
router.delete('/:id', function (req, res) {

    // Se buscsa el estudiante por id y se valida con el parámetro recibido a través de la petición delete
    let studentFound = students.find(function (student) {
        return student.id === parseInt(req.params.id);
    });

    if (studentFound) {

        // Busca dentro del arreglo estudiantes el índice que se desea eliminar
        let targetIndex = students.indexOf(studentFound);

        // Se utiliza el método splice para eliminar el estudiante encontrado
        students.splice(targetIndex, 1);

        // Retorna 204 si se elimina corretamente, en caso contrario 404 (no encontrado)
        res.sendStatus(204);
        console.log("Server Status " + 204);

    } else {
        res.sendStatus(404);
        console.log("Server Status " + 404);
    }
});

//Se exporta el objeto router como un módulo de aplicación de Node.js a través del objeto module.exports
module.exports = router;