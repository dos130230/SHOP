import fetch from '../../utils/postgres.js'


const get = ({page,limit}) => fetch(`
select
  op.productId,
  p.productName,
  o.isPaid,
  sum(op.productCount *  p.productPrice) as summa,
  sum(op.productCount) as count

from orders_product as op
left join products as p on p.productId = op.productId
left join orders as o on o.orderId = op.orderId
where o.isPaid
group by op.productId,p.productPrice,p.productName,o.isPaid
order by summa desc
offset ($1-1)*$2  limit $2

`,page,limit)


export default {
  get
}