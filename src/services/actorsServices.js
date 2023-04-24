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
destroyActor : async (id) => {
    try {
        const dstActor = await db.Actor.destroy({
            where : {id}
        });
        return dstActor;
    } catch (error) {
        throw {
            status : 500,
            message : error.message
        }
    }
}
}