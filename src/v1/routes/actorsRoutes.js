const router = require('express').Router();

const {list, detail, store, update, destroy} = require('../../controllers/genresController'); 



router
.get('/',list)
.get('/:id',detail)
.post('/', store)
.put('/:id', update)
.delete('/:id', destroy)



module.exports = router;