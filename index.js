let user = {};
let totalUser = [];
let errorIcon = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i>`;

let error_name = document.getElementById("error_name");
let error_occupation = document.getElementById("error_occupation");
let error_income = document.getElementById("error_income");

let modalBtn = document.querySelector(".modal-btn");
let modalBody = document.querySelector(".modal-body");
let inputName = document.querySelector("#name");
let income = document.querySelector("#income");
let occupation = document.querySelector("#occupation");
let modalBtnCloser = document.querySelector(".modalBtn-closer");

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
            nameValid = false;
            error_name.innerHTML = `${errorIcon} Name is required`;
        }
        else if (value.length < 3) {
            validate = false;
            addClass(fieldId);
            nameValid = false;
            error_name.innerHTML = `${errorIcon} Name should 3 character`;
        }
        else if (!validate) {
            addClass(fieldId);
            nameValid = false;
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
            occupationValid = false;
            error_occupation.innerHTML = `${errorIcon} Occupation is required`;
        }
        else if (value.length < 5) {
            validate = false;
            addClass(fieldId);
            occupationValid = false;
            error_occupation.innerHTML = `${errorIcon} Occupation should minimum 5 character`;
        }
        else if (!validate) {
            addClass(fieldId);
            occupationValid = false;
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
        else if (value <= 0) {
            validate = false;
            addClass(fieldId);
            incomeValid = false;
            error_income.innerHTML = `${errorIcon} Income can not be negative or zero`;
        }
        else if (!validate) {
            addClass(fieldId);
            incomeValid = false;
            error_income.innerHTML = `${errorIcon} Income contain only number`;
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
    user.createdAt = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    user.createdTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const modalHtml = `
            <div>
                <h2>Information of ${user.name}</h2>
                <p class="mb-3">Name: ${user.name}</p>
                <p class="mb-3">Occupation: ${user.occupation}</p>
                <p class="mb-3">Annual Income: $${user.income}</p>
                <p class="mb-3">TAX: $${user.tax}</p>
                <p class="mb-3">Created Date: ${user.createdAt}</p>
                <p class="mb-3">Created Time: ${user.createdTime}</p>
                <div onclick={handleSave()} class="closer save"><i class="fa-regular fa-floppy-disk fa-shake"></i> Save</div>
            </div>
    `;
    handleModal(modalHtml);
};



document.querySelector(".i-btn").addEventListener("click", ()=>{
    const modalHtml = `
         <h3 class="text-center mb-4">Tax Description</h3>
         <p class="mb-2"> 1. If income will less than 250000 then no tax have to paid.</p>
         <p class="mb-2"> 2. If income will greater equal 250000 and less equal 500000 then 5% tax have to be paid.</p>
         <p class="mb-2"> 3. If income will greater than 50000 and less equal 800000 then 10% tax have to be paid.</p>
         <p class="mb-2"> 4. If income will above 800000 then 15% tax have to be paid.</p>
         <h5 class="text-center mt-4">Note: This app calculate only the total tax after match those above criteria</h3>
    `;
    handleModal(modalHtml);
});


// ................localStorage functionality ................. 

const handleSave = () => {
    addToUser();
    modalBtnCloser.click();
}

modalBtnCloser.addEventListener("click", () => {
    inputName.value = "";
    income.value = "";
    occupation.value = "";
    nameValid = false;
    occupationValid = false;
    incomeValid = false;
    document.querySelectorAll(".input-div").forEach((item) => {
        item.onblur();
    });
    submitBtn.setAttribute('disabled', '');
})


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
        <h3 class="primary-text">All Information List</h1>
        ${totalUser.map(user => ` 
                <div class="person-income">
                    <h2>Information of ${user.name}</h2>
                    <p>Name: ${user.name}</p>
                    <p>Occupation: ${user.occupation}</p>
                    <p>Annual Income: $${user.income}</p>
                    <p>TAX: $${user.tax}</p>
                    <p class="mb-3">Created Date: ${user.createdAt}</p>
                    <p class="mb-3">Created Time: ${user.createdTime}</p>
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

// handling reusable modal 
const handleModal = (modalHtml) => {
    modalBody.innerHTML = modalHtml;
    modalBtn.click();
};
// .....................
