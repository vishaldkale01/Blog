require("dotenv").config();
const express = require("express");
require("./config/db");

var { graphqlHTTP } = require("express-graphql")

const userSchema = require("./schemas/userSchema");
const userResolver = require("./Resolvers/userResolver");
const blogSchema = require("./schemas/blogSchema");
const BlogResolver = require("./Resolvers/BlogResolver");
const { verify } = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const path = require("path")

const ejs = require('ejs');
const fs = require('fs');
const configureSocketIO = require("./connection/socketIo");
const app = express();

const server = require("http").createServer(app)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  
  let tempCOnfig = {
    PORT : process.env.PORT ,
    HOST : process.env.HOST
  }

  const serverData = {
    serverValue: 'Hello from the server!',
};
  res.render('blog' ,  {title : tempCOnfig} );
});
app.get('/Signup', (req, res) => {
  res.render('template');
});
app.get("/blog",(req , res)=>{
  res.render('blog')
})

app.get("/addblog",(req , res)=>{
  res.render('addBlog')
})

app.get("/contact",(req ,res)=>{
  res.render("contact")
})
app.get("/login",(req ,res)=>{
  res.render("login")
})
app.get("/about",(req ,res)=>{
  res.render("about")
})

const startgraphqlserver1=async()=>{
  const server=new ApolloServer({
    typeDefs:blogSchema,
    resolvers:BlogResolver,
    playground: true,
    // context:({req})=>{
    //   const tokenverify=verify(req.headers.authorization,"secret")
    //   return tokenverify
    // }
  })
  await server.start()
  server.applyMiddleware({app,path:"/graphql1"})
}

const startgraphqlserver=async()=>{
  const server=new ApolloServer({
    typeDefs:userSchema,
    resolvers:userResolver,
    playground: true,
  })
  await server.start()
  server.applyMiddleware({app,path:"/graphql"})
}

startgraphqlserver1()
startgraphqlserver()

configureSocketIO(server)
let port = process.env.PORT || 3030

let config = {
  port : process.env.PORT ,
  host : process.env.HOST
}


server.listen(port, (error) => {
  console.log(`server is started on ${process.env.PORT}`);
});