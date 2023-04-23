const router = require('express').Router();

const {list, detail, store, update, destroy} = require('../controllers/genresApiController');
const genresValidator = require('../validations/genresValidator')

/* /api */
/* router
.get('/genres',list)
.get('/genres/detail/:id',detail); */


/* /api/genres */
router
.get('/',list)
.get('/:id',detail)
.post('/', genresValidator, store)
.put('/:id', update)
.delete('/:id', destroy)



module.exports = router;