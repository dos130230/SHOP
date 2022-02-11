import module from './module.js'
import jwt from '../../utils/jwt.js'


export default {
  Query : {
    statistics  :(parent,{page=1,limit=5},context) => {
      try {
        if(!context.headers.token)  throw  new Error("required token!") 
          let pars = jwt.verify(context.headers.token)
        if(!pars.userrole) throw new Error("invalid token!")
          
          return module.get({page,limit})

      }catch(error){
        console.log(error)
        return { 
          status : 401,
          message : error.message
        }
      }
    }
  },
  Statistic : {
    Id : ({productid}) => productid,
    Name : ({productname}) => productname,
    TotalMoney : ({summa}) => summa,
    TotalCount : ({count}) => count
  }
}

