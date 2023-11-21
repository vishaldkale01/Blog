console.log("Hello");
const userTableBody = document.getElementById("createUserResult");

const checkboxes = document.querySelectorAll('input[type="checkbox"][name="fields"]');

const getAllUsers = async () => {
createUserResult.classList.remove('hide')

    console.log(checkboxes);

    let selectedFields = [];

    // Iterate through the checkboxes and check which ones are selected
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedFields.push(checkbox.value);
        }
    });
    console.log(selectedFields);
    if (selectedFields.length === 0) {
        selectedFields = " id name email password"
    }
    try {
        let data = localStorage.getItem("config")
        let {PORT , HOST} = JSON.parse(data)
        const response = await axios.post(`http://${HOST}:${PORT}/graphql` , {
            query: `
                query GetUser2 {
                    getUser {
                        message
                        Data {
                          ${selectedFields}
                        }
                    }
                }
            `
        });

        const result = response.data;
        const users = result.data.getUser.Data;
        return users;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

const fetchAndLogUsers = async () => {
    try {
        const users = await getAllUsers();
        console.log("All Users:", users);
    } catch (error) {
        console.error("Error:", error);
    }
};


const displayUsersInTable = async () => {
    const users = await getAllUsers();

    // Clear existing table data
    userTableBody.innerHTML = "";

    // Populate the table with user data
    
    if (users.length > 0) {
        const table = document.createElement("table");
        table.classList.add("user-table");

        // Create table headers
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");


        let headers = []
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                headers.push(checkbox.value);
            }
        });
        console.log("header",headers);
        if (headers.length === 0) {
            headers = ["Id","Name", "Email" , "Password" ]
        }
            headers.forEach(headerText => {
                const th = document.createElement("th");
                th.textContent = headerText;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

        // Create table body rows
        const tbody = document.createElement("tbody");

        users.forEach(user => {
            const row = document.createElement("tr");
            const { id ,name, email , password} = user;

            let rowData = []
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    switch (checkbox.checked) {
                        case "id":
                            rowData.push[id]
                            break;
                            case "name":
                                rowData.push[name]
                                break;
                                case "email":
                            rowData.push[email]
                            break;
                            case "password":
                            rowData.push[password]
                            break;
                        default:
                            rowData = [id ,name, email , password]
                            break;
                    }        
                }else{
                    rowData = [id ,name, email , password]
                }
            });
           


            rowData = rowData.filter((item)=> item !== undefined)
            console.log(rowData , "rowData");
            // const rowData = [id , name, email , password];

            rowData.forEach(cellData => {
                const cell = document.createElement("td");
                cell.textContent = cellData;
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Append the table to the UserTable div
        userTableBody.appendChild(table);
    } else {
        userTableBody.textContent = "No users found.";
    }



};

document.getElementById("getUserBtn").addEventListener("click", displayUsersInTable)

// Call the async function
// fetchAndLogUsers();
