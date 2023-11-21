// blog.js
// require('dotenv').config()

let getConfig = JSON.stringify(localStorage.getItem("config"))
let PORT = getConfig.PORT || 3000
let HOST = getConfig.HOST || "localhost"
console.log();
var socket = io.connect()
document.addEventListener('DOMContentLoaded', function () {
    const blogPostForm = document.getElementById('blogPostForm');
    const blogPostList = document.getElementById('blogPostList');
    const gettoken =  localStorage.getItem("login User")
  if (!gettoken) {
    alert("Please log in to access this page.");

// Redirect to the login page
    window.location.href = "http://localhost:3000/login";
  }
  let data = localStorage.getItem("config")
let {PORT , HOST} = JSON.parse(data)

    blogPostForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form input values
        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const desc = document.getElementById('description').value;

        // Create a new blog post element
        const postItem = document.createElement('li');


        const response = await axios.post(`http://${HOST}:${PORT}/graphql1`, {
                    query: `
                    mutation AddBlog($title: String, $desc: String, $name: String) {
                      addBlog(title: $title, desc: $desc, name: $name)
                    }
                        `,
                    variables: {    
                      title,
                      desc , 
                      name,
                    }
                });

                const responceMessage = await response.data.data.addBlog
                if(responceMessage == "blog is added"){
                  // emit messsage for other user to inform new block is created
                  socket.emit("NewBlogCreate" , {name , title , desc})
                  alert(`${responceMessage}`)
                }
                
                console.log("responce",response);
        postItem.innerHTML = `
            <h3>${title}</h3>
            <p>Posted by ${name}</p>
            <p>${desc}</p>
        `;

        // Add the new blog post to the list
        blogPostList.appendChild(postItem);

        // Clear form fields
        blogPostForm.reset();
    });
});

