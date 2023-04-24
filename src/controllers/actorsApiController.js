const {validationResult} = require('express-validator');
const { getAllActors,getOneActor,createActor,updateactor, destroyActor } = require('../services/actorsServices');

const createResponseError = ('../helpers/createResponseError.js')



const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {
    list: async (req, res) => {

        try{
            const actors = await getAllActors();
    
            return res.status(200).json({
                ok : true,
                data : actors,
                meta : {
                    status: 200,
                    total : actors.length,
                    url : '/api/actors'
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
       
    const actor = await getOneActor(id)
        return res.status(200).json({
            ok : true,
            meta : {
                status: 200,
                total : 1,
                url : `/api/Actors/${id}`
            },
            data : actor
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
    store: async (req, res) => {
        try{
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) throw {
                status : 400,
                message : errors.mapped()
            }
            
               const newActor = await createActor(req.body);
            
               return res.status(200).json({
                ok : true,
                meta : {
                    status: 200,
                    total : 1,
                    url : `/api/actors/${newActor.id}`
                },
                data : newActor
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
                    const updActor = await updateActor(req.params.id,req.body)
                    return res.status(200).json({
                        ok: true,
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/api/actors/${id}`
                        },
                        data: updActor
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
        
                    const dstActor = await destroyActor(id);
                    return res.status(200).json({
                        ok: true,
                        meta: {
                            status: 200,
                            total: 1,
                            url: `/api/actors/${id}`
                        },
                        data: dstActor
                    });
        
                } catch (error) {
                    return res.status(error.status || 500).json({
                        ok : false,
                        error : {
                            status : error.status || 500,
                            message : error.message || 'Ocurrió un error'
                        }
                    })
                }
            }
        
}
