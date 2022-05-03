import express from "express";
import dotenv from 'dotenv';
import session from 'express-session';

const app = express();

dotenv.config();

const {
  APP_LOCALHOST : hostname,
  APP_PORT: port
} = process.env;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(session({
  name : 'simple',
  secret : 'simple',
  resave : false,
  saveUninitialized: true
}));

app.get('/', (req, res)=> {
  if( req.session.count  ){
    req.session.count++;
  }else{
    req.session.count = 1;
  }

  res.json({ message : "Hello World", count : req.session.count });
});

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});