import module from './module.js'
import jwt from '../../utils/jwt.js'

export default {
	Query : {
		orders : (_,{page,limit},context) => {
			try {
				if(!context.headers.token)  throw  new Error("required token!") 
					let pars = jwt.verify(context.headers.token)
				return module.orders({pars,page,limit})

			}catch(error){
				console.log(error)
				return {
					status : 401,
					message : error.message
				}
			}
		}
	},
	Order : {
		orderId : ({orderid}) => orderid,
		userId :({userid}) => userid,
		userName :({username}) => username,
		products :({products}) => products,
		totalPrice : ({totalprice}) => totalprice,
		isPaid: ({ispaid}) => ispaid,
		createDate : ({createdate}) => createdate
	},
	Mutation : {
		addOrder : (_,{productId,productCount},context) => {
			try {
				if(!context.headers.token)  throw  new Error("required token!") 
					let pars = jwt.verify(context.headers.token)
				let userId = pars.userid
					let res = module.add({userId,productId,productCount})
				return {
					status : 201,
					message : "Order created!"
				}
			}catch(error){
				console.log(error)
				return {
					status : 401,
					message : error.message
				}
			}
		}

		// putOrder : (_,{orderId , categorId , productId , productCount},context) => {
		// 	try {
		// 		if(!context.headers.token)  throw  new Error("required token!") 
		// 			let pars = jwt.verify(context.headers.token)
		// 		if(!pars.userrole) throw new Error("invalid token!")
		// 			let res = module.put({orderId , categorId , productId , productCount})
		// 		return {
		// 			status : 201,
		// 			message : "Order Update!"
		// 		}
		// 	}catch(error){
		// 		return {
		// 			status : 401,
		// 			message : error.message
		// 		}
		// 	}
		// }

	}

}

