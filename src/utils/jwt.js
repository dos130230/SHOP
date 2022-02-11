import jwt from 'jsonwebtoken'

export default {
  sign : (data) => jwt.sign(data,'doston'),
  verify : (token) => jwt.verify(token,'doston')
}