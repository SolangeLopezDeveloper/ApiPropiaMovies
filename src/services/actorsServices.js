const db = require('../database/models');
module.exports = {
    getAllActors : async () => {
       try {
         const actors = await db.Actor.findAll();
     return actors 
    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
    }
},
getOneActor : async(id) => {
    try {
        const actor = await db.Actor.findByPk(id);
return actor

    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
}
},
createActor : async (data) =>
{
    try{
        const newActor = db.Actor.create({
            ...data
        })
        return newActor
    } catch (error){
        throw{
            status : 500,
            message : error.message
        }
    }
},
updateactor: async (actorId,actorData) => {
    try {
   
      const updActor= await db.Actor.update(
                {
                    first_name: actorData.first_name,
                    last_name: actorData.last_name,
                    rating: actorData.rating,
                    favorite_movie_id: actorData.favorite_movie_id
                },
                {
                    where: { id: actorId }
                }
                )
                return updActor
    } catch (error) {
        throw{
            status : 500,
            message : error.message
        }
    }
},
destroyActor: async (req,res) => {
const id = req.params.id;
    try {
        const confirm = await db.Actor.destroy({
             where: { 
                id
             }, 
             force: true 
            });

        if (confirm) {
            return res.status(200).json({
         
                ok: true,
                meta: {
                    status: 200,
                    total: confirm,
                    url: `/api/actors/${id}`
                },
                data: confirm
            })
        } 
  return res.status(204).json({
                ok: true,
                meta: {
                    status: 204,
                    total: confirm,
                    url: `/api/actors/${id}`
                },
                data: confirm
            })
       
    }  catch (error){
        throw{
            status : error.status,
            message : error.message
        }
    }
}
}