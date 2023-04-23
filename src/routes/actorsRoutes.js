const router = require('express').Router();

const {list, detail, store, update, destroy} = require('../controllers/actorsApiController'); 
const actorsValidator = require('../validations/actorsValidator')
/* /actors */

router
.get('/',list)
.get('/:id',detail)
.post('/', actorsValidator, store)
.put('/:id', update)
.delete('/:id', destroy)



module.exports = router;