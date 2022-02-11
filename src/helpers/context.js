import queryParser from './queryParser.js'
import jwt from './../utils/jwt.js'

export default function({req}){
 try{
   const { operation, fieldName, variables} = queryParser(req.body)
   if(fieldName == '__schema') return 


    // ustoz tokeni bu yerda tekshirishga ulgurmadim!!!!


    return req
}catch(error){

  }
}

// addCategories
// putCategories
// delCategories
// addOrder
// addProducts
// putProducts
// delProducts
// statistics

// categories
// products