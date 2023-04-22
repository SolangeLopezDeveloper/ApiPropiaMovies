const express = require('express');
const router = express.Router();
const {list,detail,store,update,destroy} = require('../../controllers/moviesApiController');

router
.get('/',list)
.get('/:id',detail)
.post('/',store)
.put('/:id',update)
.delete('/:id',destroy)

module.exports = router;