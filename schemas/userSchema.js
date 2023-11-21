const { buildSchema } = require("graphql");
module.exports = buildSchema(`
  type User {
    id: String,
    name: String,
    email: String,
    password: String,
    createdAt: String
  }
type Response {
   message: String,
   Data: [User]
}
type Login{
  message: String,
  token:String,
  name : String
}
 type Query {
    getUser: Response,
    getUserBy(id:String):User
    userLogin(email: String,password: String):Login

 }
  type Mutation {
    addUser(name: String,email: String,password: String): User,
    updateuser(id:String, name: String,email: String,password: String): User
    deleteUserByid(id:String):User
  }

`);
