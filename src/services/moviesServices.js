const db = require('../database/models');
module.exports = {
    getAllMovies : async () => {
       try {
         const movies = await db.Movie.findAll();
     return movies 
    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
    }
},
getOneMovie : async(id) => {
    try {
        const movie = await db.Movie.findByPk(id);
return movie

    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
}
},
createMovie : async (data) =>
{
    try{
        const newMovie = await db.Movie.create({
            ...data
        })
        return newMovie
    } catch (error){
        throw{
            status : 500,
            message : error.message
        }
    }
},
updateMovie: async (movieId,movieData) => {
    try {
   
      const updMovie= await db.Movie.update(
                {
                    title: movieData.title,
                    rating: movieData.rating,
                    awards: movieData.awards,
                    release_date: movieData.release_date,
                    length: movieData.length,
                    genre_id: movieData.genre_id
                },
                {
                    where: { id: movieId }
                }
                )
                return updMovie
    } catch (error) {
        throw{
            status : 500,
            message : error.message
        }
    }
},
destroyMovie : async (id) => {
    try {
        const dstMovie = await db.Movie.destroy({
            where : {id}
        });
        return dstMovie;
    } catch (error) {
        throw {
            status : 500,
            message : error.message
        }
    }
}
}