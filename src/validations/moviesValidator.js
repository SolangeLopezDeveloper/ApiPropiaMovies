const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage("El campo 'title' es obligatorio"),
    check('rating')
        .notEmpty()
        .withMessage("El campo 'rating' es obligatorio"),
    check('awards')
        .notEmpty()
        .withMessage("El campo 'awards' es obligatorio")
   
]