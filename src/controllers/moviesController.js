const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


module.exports= {
    list: async (req, res) => {
      try{  
        const movies = await db.Movie.findAll();

    return res.status(200).json({
        ok : true,
        meta : {
            status : 200,
            total : movies.length,
            url : '/api/movies'
        },
        data : movies
    })
        } catch(error){
            console.log(error)
            return res.status(500).json({
                msg : error.message
            })
        }
    },
    detail: async (req, res) => {
        try{ 
            const {id} = req.params;
            const movie = await db.Movie.findByPk(id);
            
            return res.status(200).json({
                ok : true,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/movies/${id}`
                },
                data : movie
            })
        }catch (error){
            console.log(error)
            return res.status(500).json({
                msg : error.message
            })
        }
    },
    store: function (req,res) {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
   
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
    destroy: function (req,res) {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/movies')})
        .catch(error => res.send(error)) 
    }
}
