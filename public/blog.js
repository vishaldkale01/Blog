var socket = io.connect()

socket.on("connection",(msg)=> console.log("socket connect" , msg))

let data = localStorage.getItem("config")
let {PORT , HOST} = JSON.parse(data)

socket.on("userJoin" , (msg)=>{
console.log(msg , "msgssssssss");
  alert(msg)
} )

// updateNewBlock()

const blogContainer = document.getElementById('blog-container');


const getAllBlock = async () =>{



  const response = await axios.post(`http://${HOST}:${PORT}/graphql1`, {
            query: `
            query Query {
              getBlogs {
                Data {
                  desc
                  id
                  title
                  createdAt
                  name
                }
                message
              }
            }
            ` 
        },
      //   {
      //     headers: headers // Set the headers here
      // } 
        );
        const blogPosts = response.data.data.getBlogs.Data;

        blogPosts.forEach(post => {
          !post.name ? post.name = "Unknown author " : post.name
          const postSection = document.createElement('section');
          postSection.className = 'blog-post';
          console.log(post,"post");
          postSection.innerHTML = `
              <h2>${post.title}</h2> 
              <p>Posted on <span class="date">${post.createdAt}</span> Posted by <span class="author">${post.name}</span></p>
              <br>
              <p>  ${post.desc}</p>
          `;

          blogContainer.appendChild(postSection);
      });
        console.log(response.data.data.getBlogs.Data , "ddhsdgj");
}

// const updateNewBlock = async () =>{
  socket.on("NewBlogCreate" , (data)=>{
    console.log("NewBlogCreate" , data.name );
    let chk  = false
    alert(`new blog added by ${data.name}`  )
      location.reload()
      // 
  })



getAllBlock()
