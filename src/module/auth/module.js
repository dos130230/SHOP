import fetch from '../../utils/postgres.js'

const login = ({username,password}) => fetch(`
SELECT
  userName,
  userContact,
  userRole,
  userId
FROM users
WHERE 
  userName = $1 AND userPassword = crypt($2, userPassword)

  `,username,password)


const register = ({userName, userPassword, userContact, userEmail}) => fetch(`
insert into users (
userName, 
userPassword, 
userContact, 
userEmail, 
userRole
) values ($1, crypt($2, gen_salt('bf')), $3, $4, false)
returning userName,userContact,userRole,userId
;
  `,userName, userPassword, userContact, userEmail)

export default {
  login,
  register
}


// SELECT
//   userId
//   FROM users
//  WHERE 
//   userName = 'admin' AND userPassword = crypt('admin', userPassword)