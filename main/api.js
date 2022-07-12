const client = require('./connection.js');
const express = require('express');
const app = express();
const cors = require(`cors`);
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");


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

app.get('/food', (req, res)=>{
  client.query(`Select * from food`, (err, result)=>{
    if(!err){
      res.send(result.rows
      );
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})

app.get('/food/:id', (req, res)=>{
  client.query(`Select * from food where id=${req.params.id}`, (err, result)=>{
    if(!err){
      res.send(result.rows[0]);
    }
  });
  client.end;
})


app.delete('/food/:id', (req, res)=> {
  let insertQuery = `delete from food where id=${req.params.id}`
  console.log(req.params.id)
  client.query(insertQuery, (err, result)=>{
    if(!err){
      res.send('Deletion was successful')
    }
    else{ console.log(err.message) }
  })
  client.end;
})


app.get('/users', (req, res)=>{
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

app.post('/users/login', (req, res)=> {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      const users = result.rows;

      const {email, password} = req.body;
      const user = users.find(user => user.email === email && user.password === password)

      if (user) {
        console.log('git', user)
        res.send(generateToken(user));
      } else {
        console.log(err, 'Password or email incorrect')
        res.status(400).send("Password or email incorrect")
      }
    } else {
      console.log(err, 'Users not found')
    }
  })
})

app.post('/users/register',  (req, res)=> {
  client.query(`Select * from users`, (err, result)=>{
    if(!err){
      const users = result.rows;
      console.log(users)
      const {email} = req.body;
      const user = users.find(user => user.email === email)

      if(!user){
        const user = req.body;
        console.log(user)
        let insertQuery = `insert into users(name, email, password, isadmin)
                       values('${user.name}', '${user.email}', '${user.password}', '${user.isadmin=false}')`

        client.query(insertQuery, (err, result)=>{
          if(!err){
            res.send('Insertion was successful')
          }
          else{ console.log('err', err.message) }
        })
        client.end;
      }
      else {
        console.log('User already exists')
        res.send('User already exists');
      }
    } else{
      console.log(err, 'Users not found')
    }
  })
})

app.get('/users/verify', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err){
      res.sendStatus(403);
    } else{
      res.json({
        message: 'Post created',
        authData,
        isadmin: authData.isadmin,
      });
    }
  });
})

const generateToken = (user) => {
  const token = jwt.sign({
    email: user.email, isadmin: user.isadmin
  }, "secretKey", {
    expiresIn: "30d"
  });
  console.log(token)
  user.token = token;
  return user;
}

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    console.log(bearerToken)
    next();
  }else {
    res.sendStatus(403);
  }
}

function dynamicSort(property) {
  return function(a, b) {
    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  }
}





app.get('/examplefood', (req, res)=>{
  client.query(`Select * from examplefood`, (err, result)=>{
    if(!err){
      res.send(result.rows
      );
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})

app.post('/examplefood/add', (req, res)=>{

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
              console.log('Insertion was NOT successful', err.message)
            }
          })
          client.end;
        } else {

          j += 1;

          if (j === sorted_rows.length){
            const food = req.body;

            let insertQuery = `insert into examplefood(id, name, price, cooktime, imageurl)
                       values('${food.id = j + 1}', '${food.name}', '${food.price}', '${food.cooktime}', '${food.imageurl}')`

            client.query(insertQuery, (err, result) => {
              if (!err) {
                console.log('ds')
                res.send('Insertion was successful')
                client.end;
              } else {
                console.log('Insertion was NOT successful', err.message)
              }
            })
            client.end;
          }
        }
      }
    } else{
      console.log(err, 'error')
    }
  });
})

