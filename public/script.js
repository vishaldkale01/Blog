
const userForm = document.getElementById("userForm");
const createUserResult = document.getElementById("createUserResult")


var socket = io.connect()

const validateForm = () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    
    let isValid = true;
    
    // Name validation
    if (!nameInput.validity.valid) {
        nameError.textContent = "Please enter a valid name.";
        isValid = false;
    } else {
        nameError.textContent = "";
    }
    
    // Email validation
    if (!emailInput.validity.valid) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }
    
    // Password validation
    if (!passwordInput.validity.valid) {
                passwordError.textContent = "Please enter a valid password.";
                isValid = false;
            } else {
                passwordError.textContent = "";
            }
            
            return isValid;
        };
        
        const handleSubmit = async (event) => {
            event.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            try {
                const response = await axios.post('http://localhost:3000/graphql', {
                    query: `
                    mutation AddUser2($name: String!, $email: String!, $password: String!) {
                        addUser(name: $name, email: $email, password: $password) {
                                id
                                name
                                email
                                password
                                createdAt
                            }
                        }
                        `,
                    variables: {    
                        name,
                        email,
                        password,
                    }
                });
                
                const result = response.data;

                socket.emit("userCreate", result)

                console.log("created user" , result.data.addUser);
                userForm.reset();
                alert(`User created successfully! user Name ${JSON.stringify(result.data.addUser.name).replace(/"/g, '')}`)
                // createUserResult.textContent = "User created successfully!";
            } catch (error) {
                console.error("Error:", error);
            }
        };
        
        // document.getElementById("getUserBtn").addEventListener("click", fetchUsers);
        userForm.addEventListener("submit", handleSubmit);