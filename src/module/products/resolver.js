import module from './module.js'
import jwt from '../../utils/jwt.js'


import { GraphQLUpload ,graphqlUploadExpress} from 'graphql-upload'
import { finished }   from 'stream/promises'

export default {
	Query : {
		products : () => module.product(),
	},
	Product : {
		productId : ({productid}) => productid,
		productName :({productname}) => productname,
		categorName :({categorname}) => categorname,
		productPrice : ({productprice}) => productprice
	},
	Mutation : {
		addProducts : (_,{file,productName ,productPrice ,productShortDesc ,productLongDesc ,categorId},context)=> {
			try {
				if(!context.headers.token)  throw  new Error("required token!") 
				let pars = jwt.verify(context.headers.token)
				if(!pars.userrole) throw new Error("invalid token!")

					let res = module.add({file,productName ,productPrice ,productShortDesc ,productLongDesc  ,categorId})
				return {
					status : 201,
					message : "Product created!",
				}
			}catch(error){
				return {
					status : 401,
					message : error.message9,
				}
			}
		},
		putProducts : (_,{productId,file,productName ,productPrice ,productShortDesc ,productLongDesc ,categorId},context)=> {
			try {
				if(!context.headers.token)  throw  new Error("required token!") 
				let pars = jwt.verify(context.headers.token)
				if(!pars.userrole) throw new Error("invalid token!")

				let response = module.put({productId,file,productName ,productPrice ,productShortDesc ,productLongDesc  ,categorId})
				return {
					status : 201,
					message : "Product update!",
				}
			}catch(error){
				return {
					status : 401,
					message : error.message,
				}
			}
		},
		delProducts : (_,{productId},context)=> {
			try {
			if(!context.headers.token)  throw  new Error("required token!") 
				let pars = jwt.verify(context.headers.token)
				if(!pars.userrole) throw new Error("invalid token!")

					let res = module.del({productId})
				return {
					status : 201,
					message : "Product deleted!"
				}
			}catch(error){
				return {
					status : 401,
					message : error.message,
				}
			}

		}
	}
}