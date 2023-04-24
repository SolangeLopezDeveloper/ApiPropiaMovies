const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const { getAllMovies, getOneMovie, createMovie, updateMovie, destroyMovie } = require('../services/moviesServices')
const createResponseError = ('../helpers/createResponseError.js')
const { validationResult } = require('express-validator')
//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
const API = 'http://www.omdbapi.com/?apikey=7c7f3cb2';


module.exports = {
    list: async (req, res) => {
        try {
            const movies = await getAllMovies();

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: movies.length,
                    url: '/api/movies'
                },
                data: movies
            })
        } catch (error) {

            return createResponseError(res, error)
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const movie = await getOneMovie(id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/movies/${id}`
                },
                data: movie
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
    buscar: async (req, res) => {
        try {

            const urlBase = "https://www.omdbapi.com/";
            const apiKey = "7c7f3cb2";
            const keyword = req.body.titulo;
            const response = await fetch(`${urlBase}?apiKey=${apiKey}&t=${keyword}`)
            const movie = await response.json()

            return res.render('moviesDetailOmdb', { movie })

        } catch (error) {return res.status(error.status || 500).json({
            ok : false,
            error : {
                status : error.status || 500,
                message : error.message || 'Ocurrió un error'
            }
        })
    }
    },
    store: async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const newMovie = await createMovie(req.body);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 201,
                    total: 1,
                    url: `/api/movies/${newMovie.id}`
                },
                data: newMovie
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
            const updMovie = await updateMovie(req.params.id,req.body)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/movies/${id}`
                },
                data: updMovie
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
    destroy: async (req, res) => {
 
        try {
            
            const {
                params : {id}
            } = req;

            const dstMovie = await destroyMovie(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/movies/${id}`
                },
                data: dstMovie
            });

        } catch (error) {
            return createResponseError(res,error);
        }
    }

}