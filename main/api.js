const { expressjwt: expressJwt } = require('express-jwt');
const client = require('./connection.js');
const express = require('express');
const app = express();
const cors = require(`cors`);
const bodyParser = require('body-parser');
const jwks = require('jwks-rsa');


const jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-uwzbl008.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://auth0-api/',
  issuer: 'https://dev-uwzbl008.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3300, ()=>{
  console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/food',jwtCheck, (req, res)=>{
  client.query(`Select * from food`, (err, result)=>{
    if(!err){
      res.send(result.rows);
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})


app.get('/food/:id',jwtCheck, (req, res)=>{
  client.query(`Select * from food where id=${req.params.id}`, (err, result)=>{
    if(!err){
      res.send(result.rows[0]);
    }
  });
})

app.delete('/food/:id',jwtCheck, (req, res)=> {
    let insertQuery = `delete from food where id=${req.params.id}`
    // console.log(req.params.id)
    client.query(insertQuery, (err, result)=>{
      if(!err){
        res.send('Deletion was successful')
      }
      else{ console.log(err.message) }
    })
    client.end;
})

app.get('/users', jwtCheck, (req, res)=>{
  client.query(`Select * from users`, (err, result)=>{
    if(!err){
      res.send(result.rows
      );
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})


app.post('/orders', jwtCheck, (req, res) => {
  client.query(`Select * from orders`, (err, result)=>{

    const orders_len = result.rows.length;
    const formatItems = `${JSON.stringify(req.body.items)}`;
    const order = req.body;

    let insertQuery = `insert into orders(id, items, totalprice, name, address)
                         values('${order.id = orders_len + 1}', '${formatItems}', '${order.totalprice}', '${order.name}', '${order.address}')`

    client.query(insertQuery, (err, result)=>{
      if(!err){
        res.send('Insertion was successful')
      }
      else{
        res.send('err', err.message)
      }
    })
    client.end;
  });
});





app.get('/examplefood', jwtCheck,(req, res)=>{
  client.query(`Select * from examplefood`, (err, result)=>{
    if(!err){
      res.send(result.rows);
    } else{
      res.send(err, 'error')
    }
  });
  client.end;
})

app.post('/examplefood/add', jwtCheck,(req, res)=>{
  client.query(`Select * from examplefood`, (err, result)=>{
    if(!err){
      arr_len = result.rows.length;
      let j = 1;
      sorted_rows = result.rows.sort(dynamicSort('id'))

      for (i in sorted_rows) {
        if (parseInt(sorted_rows[i].id) !== j) {
          const food = req.body;

          let insertQuery = `insert into examplefood(id, name, price, cooktime, imageurl)
                       values('${food.id = j}', '${food.name}', '${food.price}', '${food.cooktime}', '${food.imageurl}')`

          client.query(insertQuery, (err, result) => {
            if (!err) {
              res.send('Insertion was successful')
              client.end;
            } else {
              res.send('Insertion was NOT successful', err.message)
            }
          })
          client.end;
        } else {

          if (j === sorted_rows.length){
            const food = req.body;

            let insertQuery = `insert into examplefood(id, name, price, cooktime, imageurl)
                       values('${food.id = j + 1}', '${food.name}', '${food.price}', '${food.cooktime}', '${food.imageurl}')`

            client.query(insertQuery, (err, result) => {
              if (!err) {
                res.send('Insertion was successful')
                client.end;
              } else {
                res.send('Insertion was NOT successful', err.message)
              }
            })
            client.end;
          } else {
            j += 1;
          }
        }
      }
    } else{
      res.send(err, 'error')
    }
  });
})


function dynamicSort(property) {
  return function(a, b) {
    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  }
}
