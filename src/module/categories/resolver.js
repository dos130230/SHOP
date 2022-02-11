import module from './module.js'
import jwt from '../../utils/jwt.js'

export default {
  Query : {
    categories : (_,{page,limit,id,search}) => module.category({page,limit,id,search})
  },
  Category : {
    categorId : ({categorid}) => categorid,
    categorName : ({categorname}) => categorname
  },

  Mutation : {
    addCategories : (_,{categorName},context) => {
      try {

        if(!context.headers.token)  throw  new Error("required token!") 
          let pars = jwt.verify(context.headers.token)
        if(!pars.userrole) throw new Error("invalid token!")

          let response = module.add({categorName})
        return {
          status : 201,
          message : "Created categories!",
        }
      }catch(error){
        return {
          status : 401,
          message : error.message
        }
      }
    },
    putCategories : (_,{categorId,categorName},context) => {
      try{
        if(!context.headers.token)  throw  new Error("required token!") 
          let pars = jwt.verify(context.headers.token)
        if(!pars.userrole) throw new Error("invalid token!")

          let response = module.put({categorId,categorName})
        return {
          status : 201,
          message : "Update categories!",
        }
      }catch(error){
        return {
          status : 401,
          message : error.message
        }
      }
    },
    delCategories : (_,{categorId},context) => {
      try{
        if(!context.headers.token)  throw  new Error("required token!") 
          let pars = jwt.verify(context.headers.token)
        if(!pars.userrole) throw new Error("invalid token!")

          let response = module.del({categorId})
        return {
          status : 201,
          message : "delete categories!",
        }
      }catch(error){
        return {
          status : 401,
          message : error.message
        }
      }
    }
  }
}

