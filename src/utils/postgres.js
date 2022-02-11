import pg  from 'pg'


// const pool = new pg.Pool({
//   host: 'localhost',
//   user: 'postgres',
//   port : 5432,
//   database : "shop_db",
//   password : "130230"
// })

const pool = new pg.Pool({
  connectionString : "postgres://wfhnqbxj:cbJ8Nt-lgMdDxlacFgFI4dEDbazsHxLa@john.db.elephantsql.com/wfhnqbxj"
})

async function fetch(query, ...params){
  const client = await  pool.connect()
  try {
    const {rows}  = await  client.query( query, params.length ? params : null)
    return rows

  }catch(error){
    console.log(error)
  }
  finally{
    client.release()
  }
}

export default fetch
