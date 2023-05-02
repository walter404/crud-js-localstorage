//Validate form inputs before submiting data
function validateForm(){
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    
    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(age == ""){
        alert("Age is required");
        return false
    } else if (age < 1){
        alert("Age must not be zero or less than zero");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    } else if (!email.includes("@")){
        alert("Invalid email address");
        return false;
    }

    return true;
}

//function to show Data
function showData(){
    let peopleLIst;

    if(localStorage.getItem("peopleList") == null){
        peopleLIst = [];
    } else {
        peopleLIst = JSON.parse(localStorage.getItem("peopleList"))
    }

    let html = "";
    
    peopleLIst.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Delete</button>  <button onclick="updateData('+ index +')" class="btn btn-warning">Edit</button> </td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// loads all data when document or page loaded
document.onload = showData();

//function to add data to localstorage

function addData(){
    if(validateForm() == true){
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;

        let peopleLIst;
        if(localStorage.getItem("peopleList") == null){
            peopleLIst = [];
        } else {
            peopleLIst = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleLIst.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleLIst));

    showData();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";

    }
}

// function to delete Data from localStorage
function deleteData(index){
    let peopleLIst;
    if(localStorage.getItem("peopleList") == null){
        peopleLIst = [];
    } else {
        peopleLIst = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleLIst.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleLIst));
    showData();
}

//function to update/edit data in local storage
function updateData(index){
    //submit button will hide and update button will show for updating of data in localstorage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleLIst;
    if(localStorage.getItem("peopleList") == null){
        peopleLIst = [];
    } else {
        peopleLIst = JSON.parse(localStorage.getItem("peopleList"));
    };

    document.getElementById("name").value = peopleLIst[index].name;
    document.getElementById("age").value = peopleLIst[index].age;
    document.getElementById("address").value = peopleLIst[index].address;
    document.getElementById("email").value = peopleLIst[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            peopleLIst[index].name = document.getElementById("name").value;
            peopleLIst[index].age = document.getElementById("age").value;
            peopleLIst[index].address = document.getElementById("address").value;
            peopleLIst[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleLIst));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            //update button will hide and submit button will show 
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}