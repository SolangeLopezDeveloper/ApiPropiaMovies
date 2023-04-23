const {check} = require('express-validator');

module.exports = [
    check('first_name')
        .notEmpty()
        .withMessage("El campo 'firts_name' es obligatorio"),
    check('last_name')
        .notEmpty()
        .withMessage("El campo 'last_name' es obligatorio"),
   
]