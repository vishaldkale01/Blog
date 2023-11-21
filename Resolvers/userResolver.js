const { sign } = require("jsonwebtoken");
const userSchema = require("../model/userModel");

module.exports = {
  Query: {
    getUser: async () => {
      const data = await userSchema.find();
      return {
        message: "list of user",
        Data: data,
      };
    },
    
    userLogin: async (parent, args) => {
      console.log(parent , "parent");
      const { email, password } = args;
      const data = await userSchema.findOne({ email });
      if (data) {
        if (data.password == password) {
          const token = sign({ id: data.id }, "secret");
          return {
            message: "login successfully",
            name : data.name,
            token,
          };
        } else {
          return {
            message: "Wrong password",
            token: null,
          };
        }
      } else {
        console.log(parent , "parent");
        return {
          message: "Wrong email",
          token: null,
        };
      }
    },
    getUserBy: async (parent, args) => {
      const { id } = args;
      return await userSchema.findById(id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const { name, email, password } = args;
      return await userSchema.create({ name, email, password });
    },
    updateuser: async (parent, args) => {
      const { name, email, password } = args;
      return await userSchema.findByIdAndUpdate(id, { name, email, password });
    },
    deleteUserByid: async (parent, args) => {
      const { id } = args;
      return await userSchema.deleteUserByid(id);
    },
  },
};

