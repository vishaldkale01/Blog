// script.js

const getUserByIdForm = document.getElementById("getUserByIdForm");
const userIdInput = document.getElementById("userId");
const getUserByIdResult = document.getElementById("getUserByIdResult");
const getUserForm = document.getElementById("getUserByIdResult");


const displayUser = (user) => {
    
    const newUser = JSON.stringify(user, null, 2);
    console.log(newUser);
    getUserByIdResult.innerHTML = ` <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0" class="user-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>PASSWORD</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
        </tr>
      </tbody>
    </table>
  </div>`
};

getUserByIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = userIdInput.value.trim();

    if (!userId) {
        getUserByIdResult.textContent = "Please enter a User ID.";
        return;
    }
    console.log(userId);
    const user = await getUserById(userId);

    if (user) {
        displayUser(user);
    } else {
        getUserByIdResult.textContent = "User not found.";
    }
});

const getUserById = async (userId) => {
    getUserByIdResult.classList.remove('hide')

    try {
        console.log(userId, "userId");
        const response = await axios.post('http://localhost:3000/graphql', {
            query: `
            query GetUserBy {
                getUserBy(id: "${userId}") {
                    id
                    name
                    email
                    password
                    createdAt
                }
            }
            `,
            variables: {
                userId: userId
            }
        });

        const result = response.data;
        console.log(result,"result");
        const user = result.data.getUserBy;
        return user;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // ... Same code as before ...

    // Reset the form and display the result
    userForm.reset();
    // createUserResult.textContent = "User created successfully!";
});

getUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = userIdInput.value.trim();

    if (!userId) {
        getUserByIdResult.textContent = "Please enter a User ID.";
        return;
    }

    const user = await getUserById(userId);
    displayUser(user, getUserByIdResult);
});
