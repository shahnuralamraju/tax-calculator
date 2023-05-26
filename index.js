let user = {};
let totalUser = [];
let errorIcon = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i>`;

let error_name = document.getElementById("error_name");
let error_occupation = document.getElementById("error_occupation");
let error_income = document.getElementById("error_income");


let display = document.getElementById("display");
let incomeDiv = document.getElementById("income");
let submitBtn = document.querySelector(".submitBtn");
let userAlert = document.getElementById("user_alert");

let nameValid = false;
let occupationValid = false;
let incomeValid = false;

incomeDiv.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        submitBtn.click();
    }
});

// /^[a-zA-Z][A-Za-z0-9_ ]*$/

document.addEventListener("DOMContentLoaded", () => {
    displayAllUser();
    if (incomeDiv.length > 0) {
        submitBtn.removeAttribute('disabled');
    }
    else {
        submitBtn.setAttribute('disabled', '');
    }
})


const addClass = (id) => {
    document.getElementById(id).classList.add("is-invalid");

}
const removeClass = (id) => {
    document.getElementById(id).classList.remove("is-invalid");

}


const handleCheck = (fieldId, value) => {
    let validate = true;
    if (fieldId === "name") {
        validate = /^[a-zA-Z][A-Za-z0-9_ ]*$/.test(value);
        if (value === "") {
            validate = false;
            error_name.innerHTML = `${errorIcon} Name is required`;
        }
        else if (value.length < 3) {
            validate = false;
            addClass(fieldId);
            error_name.innerHTML = `${errorIcon} Name should 3 character`;
        }
        else if (!validate) {
            addClass(fieldId);
            error_name.innerHTML = `${errorIcon} Name doesn't containe any number, underscore or space from the begining`;
        }

        else {
            removeClass(fieldId);
            nameValid = true;
            error_name.innerHTML = '';
        }
    }
    if (fieldId === "occupation") {
        validate = /^[a-zA-Z ]*$/.test(value);
        if (value === "") {
            validate = false;
            error_occupation.innerHTML = `${errorIcon} Occupation is required`;
        }
        else if (value.length < 5) {
            validate = false;
            addClass(fieldId);
            error_occupation.innerHTML = `${errorIcon} Occupation should minimum 5 character`;
        }
        else if (!validate) {
            addClass(fieldId);
            error_occupation.innerHTML = `${errorIcon} Occupation only contain character`;
        }
        else {
            removeClass(fieldId);
            occupationValid = true;
            error_occupation.innerHTML = '';
        }
    }
    if (fieldId === "income") {
        validate = (/^[0-9]+$/).test(value);
        if (value === "") {
            validate = false;
            incomeValid = false;
            error_income.innerHTML = `${errorIcon} Income is required`;
        }
        else if (!validate) {
            addClass(fieldId);
            error_income.innerHTML = `${errorIcon} Occupation doesn't contain any character`;
        }
        else {
            removeClass(fieldId);
            incomeValid = true;
            error_income.innerHTML = '';
        }
    }

    if (validate) {
        user[fieldId] = value;
    }

    if (!nameValid || !occupationValid || !incomeValid) {
        submitBtn.setAttribute('disabled', '');
    }
    else {
        submitBtn.removeAttribute('disabled');
    }
}

const handleLabel = (id) => {
    document.getElementById(id).style.margin = "0 0 0.4em 0em"
}

const handleBlur = (labelId, inputId) => {
    const inputValue = document.getElementById(inputId);
    if (!inputValue.value) {
        document.getElementById(labelId).style.margin = "0 0 -2.1em 1em"
    }

}

const getTax = () => {
    let income = incomeDiv.value;
    let tax;
    display.innerText = "";

    if (income < 250000) {
        tax = 0;
    }
    else if (income >= 250000 && income < 500000) {
        tax = (income - 250000) * 0.05;
    }
    else if (income >= 500000 && income <= 800000) {
        tax = 12500 + (income - 500000) * 0.1;
    }
    else {
        tax = 12500 + 30000 + (income - 800000) * 0.15;
    }
    user.tax = Math.floor(tax);
    display.innerText = "You have to paid: " + Math.floor(tax) + " TK";
    addToUser();
}


// ................localStorage functionality ................. 

// getting all user form localStorage
const getAllUser = () => {
    let isFound = localStorage.getItem("users")
    if (isFound) {
        let getUsers = JSON.parse(isFound);
        totalUser = getUsers;
    }
};

// displayAllUser in UI 
const displayAllUser = () => {
    getAllUser();
    let infoContainer = document.querySelector(".right-container");
    // if (totalUser.length > 0) {
    //     console.log(totalUser.length);
    //     userAlert.style.display = "none";
        infoContainer.innerHTML = `
        <h3 class="text-center mt-3 mb-5">All Information List</h1>
        ${totalUser.map(user => ` 
                <div class="person-income">
                    <h2>Information of ${user.name}</h2>
                    <p>Name: ${user.name}</p>
                    <p>Occupation: ${user.occupation}</p>
                    <p>Annual Income: $${user.income}</p>
                    <p>TAX: $${user.tax}</p>
                    <div onclick={deleteUser(${user.id})} class="closer delete"><i class="fa-solid fa-trash-can"></i></div>
                </div>
        `).join("")}
     `
    // } else {
    //     userAlert.style.display = "block";
    // }
}

// adding user into localStorage
const addToUser = () => {
    getAllUser();
    user.id = Number(new Date());
    totalUser.push(user);
    localStorage.setItem("users", JSON.stringify(totalUser));
    displayAllUser();
}
// getting single user form localStorage
const getSingleUser = (id) => {
    getAllUser();
    const newUser = totalUser.find(user => user.id == id);
};

// delete user from localStorage
const deleteUser = (id) => {
    getAllUser();
    const newUsers = totalUser.filter(user => user.id !== id);
    totalUser = newUsers;
    localStorage.setItem("users", JSON.stringify(totalUser));
    displayAllUser();
}


