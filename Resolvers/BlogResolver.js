const blogSchema = require("../model/Blog");

module.exports = {
  Mutation: {
    addBlog: async (parent, args) => {
      const { title, desc , name } = args;
        const blog =  await blogSchema.create({ title, desc , name });
      return "blog is added"
    },
    updateBlog: async (parent, args) => {
      const { id, title, desc } = args;
      const Data = await blogSchema.findByIdAndUpdate(id, { title, desc });
      return {
        message: "blog is Updated",
        Data,
      };
    },
    deleteBlogsIdBy: async (parent, args) => {
      const { id } = args;
      await blogSchema.findByIdAndDelete(id);
      return "blog is deleted";
    },
  },
  Query: {
    getBlogs: async () => {
      const Data = await blogSchema.find();
      return {
        message: "Get blog list",
        Data,
      };
    },
    getBlogsIdBy: async (parent, args) => {
      const { id } = args;
      const Data = await blogSchema.findById(id);
      return {
        message: "Get blog by id",
        Data,
      };
    },
  },
};
