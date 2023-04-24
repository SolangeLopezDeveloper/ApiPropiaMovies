const db = require('../database/models');

module.exports = {
    getAllGenres : async () => {
       try {
         const genres = await db.Genre.findAll();
     return genres 
    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
    }
},
getOneGenre : async(id) => {
    try {
        const genre = await db.Genre.findByPk(id);
return genre

    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
}
},
createGenre : async (data) =>
{
    try{
        const newGenre = db.Genre.create({
            ...data
        })
        return newGenre
    } catch (error){
        throw{
            status : 500,
            message : error.message
        }
    }
},
updateGenre: async (genreId,genreData) => {
    try {
   
      const updGenre= await db.Genre.update(
                {
                    name: genreData.name,
                    ranking: genreData.ranking,
                    active: genreData.active
                   
                },
                {
                    where: { id: genreId }
                }
                )
                return updGenre
    } catch (error) {
        throw{
            status : 500,
            message : error.message
        }
    }
},
/* destroyGenre: async (req,res) => {
const id = req.params.id;
let status = 204;
    try {
        const confirm = await db.Genre.destroy({
             where: { 
                id
             }, 
             force: true 
            });

        if (confirm) {
            status = 200;
            return res.status(status).json({
         
                ok: true,
                meta: {
                    status,
                    total: confirm,
                    url: `/api/genres/${id}`
                },
                data: confirm
            })
        } 
  return res.status(status).json({
                ok: true,
                meta: {
                    status,
                    total: confirm,
                    url: `/api/genres/${id}`
                },
                data: confirm
            })
       
    }  catch (error){
        throw{
            status : error.status,
            message : error.message
        }
    }
} */
destroyGenre : async(id) => {
    try {
        const dstGenre = await db.Genre.destroy({
            where :{
                id
            }
        })
        return dstGenre;
    } catch (error) {
        throw {
            status : 500,
            message: error.message
        }
    }
}
}