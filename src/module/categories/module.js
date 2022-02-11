import fetch from '../../utils/postgres.js'
import jwt from '../../utils/jwt.js'

const category = ({page=1,limit=5,id,search}) => fetch(`
  select
   * 
   from categories 
   where 
   case
    when $3>0 then categorId = $3
    else true
   end and
    case
    when length($4)>0 then categorName ilike concat('%',$4,'%')
    else true
   end
   offset ($1-1)*$2 limit $2`
   ,page,limit,id,search)

const add = ({categorName}) => fetch(`
  INSERT INTO categories(categorName) VALUES ($1)`,categorName)

const put = ({categorId, categorName}) => fetch(`
  UPDATE categories SET  categorName = $2 WHERE categorId = $1 `,categorId ,categorName)

const del = ({categorId}) => fetch(`
  DELETE FROM categories where $1 = categorId `,categorId )


export default {
  category,
  add,
  put,
  del
}