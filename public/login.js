// script.js

var socket = io.connect()
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Call the loginUser function and process the mutation here
        loginUser(email, password);
    });

    async function loginUser(email, password) {
        const variables = {
            email,
            password,
        };
        console.log(variables, "variables", email , password);
        try {
            let configData = localStorage.getItem("config")
let {PORT , HOST} = JSON.parse(configData)
            const response = await axios.post(`http://${HOST}:${PORT}/graphql`, {
                query: `
                query UserLogin {
                    userLogin(email: "${email}", password: "${password}" ) {
                        message
                        token
                        name
                    }
                }
        `,
                variables
            });
            const data = response.data
            console.log(response);
            if (data.errors) { // Handle GraphQL errors here if any
                console.error(data.errors[0].message);

            } else if (data.data.userLogin.message == "Wrong password"){
                    alert("Wrong password")
                }else if(data.data.userLogin.message == "Wrong email"){
                    alert("Wrong email")
                    
            } { // Process the successful login response here
                console.log('Login result:', data.data.userLogin);
                localStorage.setItem("login User" ,JSON.stringify({userEmail : email , token : data.data.userLogin.token }))
                socket.emit("newUserLogin" , msg = "new user join ")
                window.location.href = `http://${HOST}:${PORT}/addblog`;
                // You can redirect the user or perform other actions on successful login
            }
        } catch (error) { // Handle fetch or other errors here
            console.error('Login error:', error);
        }
    }
});
