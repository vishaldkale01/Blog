// socketLogic.js


function configureSocketIO(server) {
  const io = require("socket.io")(server)

  io.on('connection', (socket) => {
    console.log('A user connected' , socket.id);

    socket.on('sendMessage', (message) => {
      io.emit('newMessage', message);
    });
    socket.on("newUserLogin" , (data)=>{
      // console.log(data , "datadatadata");
      io.emit("userJoin" ,msg = data)
    })

    socket.on("userCreate", data => console.log(data,"data"))

    socket.on("NewBlogCreate" , (data)=>{
      console.log(data , "NewBlogCreate") 
      io.emit("NewBlogCreate" , data)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

module.exports = configureSocketIO;
