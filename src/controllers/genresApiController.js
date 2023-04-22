const {validationResult} = require('express-validator');
const { createGenre,getAllGenres,getOneGenre } = require('../services/genresServices');

const createResponseError = ('../helpers/createResponseError.js')
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

        } catch (error){
           return createResponseError(res, error)
        }
    },
   detail:async (req, res) => {

    try{
        const{
            params : {id}
        }= req;
   
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

    } catch (error){
        return createResponseError(res, error)
    }
},
store : async (req,res)=>{
try{
const errors = validationResult(req);

if(!errors.isEmpty()) throw {
    status : 400,
    message : errors.mapped()
}

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
}catch(error){
    return createResponseError(res, error)
}
},
update :async (req,res)=>{
},
destroy : async (req,res)=>{
},
}

