import module from './module.js'
import jwt from '../../utils/jwt.js'

export default {
  Mutation : {

    login : async (_,{username,password}) => {
      let response = await module.login({username,password})
      if(!response.length) return {
        status : 401,
        message : "Invalid token!"

      }
      return {
        status : 200,
        message : "OK",
        token : jwt.sign(response[0])
      }
    },
    
    register : async (_,{userName ,userPassword ,userContact ,userEmail}) => {
      let res = await module.register({userName ,userPassword ,userContact ,userEmail})
      return {
          status : 200,
          message : "OK",
          token : jwt.sign(res[0])
        }
    }
  },
}