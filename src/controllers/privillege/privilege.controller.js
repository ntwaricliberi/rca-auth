const {CommonControllerConfig} = require("../common/common.controller.config")
const models = require('../../database/postgresSql/models/index')
const Joi = require('joi')
const crypto = require('crypto')

const Privilege = models.Privilege

class PrivilegeController extends CommonControllerConfig{

    constructor() {
        super("PrivilegeController");
    }



    //get all privileges
    all = async (req, res) => {
            try{
                const privileges= await Privilege.findAll() ;
                res.send(this.s('success',privileges))

            }catch (e) {
                res.send(this.s('failed',e,500))
            }
    }

    //create privilege
    create = async (req, res) => {
        let {userId,appID,viewProfile} = req.body


        try{

                //validator format
                const schema = Joi.object({
                    userId:Joi.string().required().min(20),
                    appID:Joi.string().uri().required(),
                    viewProfile:Joi.boolean().required(),
                })


                const {error} = schema.validate(req.body)

                //checking error
                if(error)
                    res.send(this.s('failed',error.details[0].message,409))

                else{

                    const result = await Privilege.create({userId, appID , viewProfile})
                    res.json(this.s('success',result))
                }

        }catch (e) {
            res.json(this.s('failed',e,500))
        }
    }


}


exports.AppsController = AppsController