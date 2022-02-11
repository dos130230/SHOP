import fetch from '../../utils/postgres.js'

const orders = ({pars,page=1,limit=5}) => {
  let id;
  console.log(pars)
  if (!pars.userrole) {
    id =pars.userid 
  }
 
console.log(id)
  return fetch(`
  select
  o.orderId,
  u.userId,
  u.userName,
  json_agg(p) as products,
  sum(p.productPrice * op.productCount) as totalPrice,
  o.isPaid,
  to_char(o.createdOrder, 'DD Mon YYYY') as createDate

from orders as o
left join orders_product as op on op.orderId = o.orderId
left join users as u on o.userId = u.userId
left join products as p on p.productId = op.productId
where
case
  when $3 > 0 then u.userId = $1
  else true
end
group by u.userId ,o.orderId,userName
offset ($1-1)*$2  limit $2
`,page,limit,id)

}
const add = async ({userId,productId,productCount}) => {

   let order = await  fetch(`select userId,orderId ,isPaid from orders where userId = $1 `,userId)
    if(!order.length) {
      order = await fetch(`insert into orders (userId,isPaid) values ($1,false) returning isPaid,userId`,userId)
    }
    if(order && order[0].ispaid) {
      order =  await fetch(`insert into orders(userId,isPaid) values ($1,false) returning userId,orderId`,userId)
    }
    console.log(order)
    let res = await  fetch(`
      insert into orders_product(orderId,productId,productCount) values 
        ($1,$2,$3)
  `,order[0].orderid,productId,productCount)
  
}

export default {
  orders,
  add
}
