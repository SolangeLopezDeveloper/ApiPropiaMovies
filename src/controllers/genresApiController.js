const {validationResult} = require('express-validator');
const { createGenre,getAllGenres,getOneGenre, updateGenre,destroyGenre } = require('../services/genresServices');

const createResponseError = ('../helpers/createResponseError.js')

/* const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor; */

module.exports = {
    list: async (req, res) => {

        try{
        const genres = await getAllGenres();

        return res.status(200).json({
            ok : true,
            data : genres,
            meta : {
                status: 200,
                total : genres.length,
                url : '/api/genres'
            }
            
        })

    } catch (error) {

        return res.status(error.status || 500).json({
            ok : false,
            error : {
                status : error.status || 500,
                message : error.message || 'Ocurrió un error'
            }
          })
      }
    
    },
   detail: async (req, res) => {

    try{
        const{params : {id}}= req;
   
const genre = await getOneGenre(id)
    return res.status(200).json({
        ok : true,
        meta : {
            status: 200,
            total : 1,
            url : `/api/genres/${id}`
        },
        data : genre
    })

} catch (error) {

    return res.status(error.status || 500).json({
      ok : false,
      error : {
          status : error.status || 500,
          message : error.message || 'Ocurrió un error'
      }
    })
}
},
store : async (req,res)=>{
try{
/* const errors = validationResult(req);

if(!errors.isEmpty()) throw {
    status : 400,
    message : errors.mapped()
} */

   const newGenre = await createGenre(req.body);

   return res.status(200).json({
    ok : true,
    meta : {
        status: 200,
        total : 1,
        url : `/api/genres/${newGenre.id}`
    },
    data : newGenre
   })
} catch (error) {

    return res.status(error.status || 500).json({
      ok : false,
      error : {
          status : error.status || 500,
          message : error.message || 'Ocurrió un error'
      }
    })
}
},
update: async (req, res) => {
    const id = req.params.id;
    try {
        const updGenre = await updateGenre(req.params.id,req.body)
        return res.status(200).json({
            ok: true,
            meta: {
                status: 200,
                total: 1,
                url: `/api/genres/${id}`
            },
            data: updGenre
        })
    } catch (error) {

        return res.status(error.status || 500).json({
            ok : false,
            error : {
                status : error.status || 500,
                message : error.message || 'Ocurrió un error'
            }
        })
    }

},
/* destroy: async (req, res) => {
  
    try {
        const id = req.params.id;
        const dstGenre = await destroyGenre(req, res, id);
        return res.status(200).json({
            ok: true,
            meta: {
                status: 200,
                total: 1,
                url: `/api/genres/${id}`
            },
            data: dstGenre
        });
    } catch (error) {

        return res.status(error.status || 500).json({
            ok: false,
            error: {
                status: error.status || 500,
                message: error.message || 'Ocurrió un error'
            }
        })
    }
}, */
destroy: async (req,res) => {
    try {
        const {
            params : {id}
        } = req;
        const dstGenre = await destroyGenre(id);
        return res.status(200).json({
            ok: true,
            meta:{
                status: 200,
                total:1,
                url:`/api/genres/${id}`
            },
            data: dstGenre
        });
    } catch(error) {
        return createResponseError(res,error)
    }
}

}

