const express = require('express');
const router = express.Router();
const {list,detail,store,update,destroy} = require('../controllers/moviesApiController');
const moviesValidator = require('../validations/moviesValidator')

router
.get('/',list)
.get('/:id',detail)
.post('/', moviesValidator,store)
.put('/:id',update)
.delete('/:id',destroy)

module.exports = router;