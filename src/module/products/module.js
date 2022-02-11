import fetch from '../../utils/postgres.js'
import { GraphQLUpload ,graphqlUploadExpress} from 'graphql-upload'
import { finished }   from 'stream/promises'
import fs from 'fs'
import path from 'path'


const product = () => fetch(`
  select
  pro.productId,
  pro.productName,
  cat.categorName,
  pro.productPrice
  from products as pro
  left join categories as cat on cat.categorId = pro.categorId
  order by pro.productId

  `);

const add =  async ({productName ,productPrice ,productShortDesc ,productLongDesc ,productImg ,categorId,file}) => {
  try {

    const { createReadStream, filename, mimetype, encoding } = file.file;
    if(filename.length<0 || filename>20 || file.length<0 || file>20) throw new Error("File name length max 1-20")
      if(!["audio/mp3","video/mp4","image/jpg","image/png"].includes(mimetype)) throw new Error("Upload only extension mp3 mp4 jpg png")
      const stream = createReadStream();
      const fileName = Date.now()+filename.trim().replace(/\s/g,"")
      const filePath = path.join(process.cwd(),"files",fileName)
      const out = fs.createWriteStream(filePath);
        console.log(filePath)
      stream.pipe(out);
      await finished(out);

      fetch(`
        insert into products (
        productName, 
        productPrice, 
        productShortDesc, 
        productLongDesc, 
        productImg, 
        categorId
        ) values ($1,$2,$3,$4,$5,$6)
        `,productName ,productPrice ,productShortDesc ,productLongDesc ,'/images/'+fileName,categorId)

    }catch(error){
      return {
        status : 400,
        message : error.message
      }
    }
  }


const put =  async ({productId,productName ,productPrice ,productShortDesc ,productLongDesc ,productImg ,categorId,file}) => {
  try {
      fetch(`
      UPDATE products 
      SET
          productName = case when length($2) > 0 then $2   else productName end,
          productPrice = case when $3 > 0 then $3   else productPrice end,
          productShortDesc = case when length($4) > 0 then $4   else productShortDesc end,
          productLongDesc = case when length($5) > 0 then $5   else productLongDesc end,
          categorId = case when $6 > 0 then $6   else categorId end
      WHERE  productId = $1
        `,productId,productName ,productPrice ,productShortDesc ,productLongDesc,categorId)

    }catch(error){
      return {
        status : 400,
        message : error.message
      }
    }
  }

const del = ({productId}) => fetch(`delete from products where productId= $1`,productId);

  export default {
    product,
    add,
    put,
    del
  }



// fetch(`
// insert into products (
// productName, 
// productPrice, 
// productShortDesc, 
// productLongDesc, 
// productImg, 
// categorId
// ) values ($1,$2,$3,$4,$5,$6)

// `,productName ,productPrice ,productShortDesc ,productLongDesc ,productImg ,categorId)