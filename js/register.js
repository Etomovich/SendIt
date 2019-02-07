//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

document.getElementById("registerButton").addEventListener("click", registerUser);

function nextPage(page) {
    document.location.href = page;
}

function registerUser(exe){
    exe.preventDefault();

    let myForm = document.getElementById("registerForm");

    let myUsername = document.getElementById("myUsername").value;
    let myEmail = document.getElementById("myEmail").value;
    let myPhone = document.getElementById("myPhone").value;
    let myPassword = document.getElementById("myPassword").value;
    let retypePassword = document.getElementById("retypePassword").value;

    let the_next = undefined;
    let statusCode = undefined; 
    let currentPage = undefined;

    currentPage = currentPage = url + '/api/v2/register'; 

    fetch(currentPage, {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            username: myUsername,
            email: myEmail,
            phone_number: myPhone,
            password: myPassword,
            retype_password: retypePassword
        })
    }).then(function (response) {
        statusCode = response.status;
        console.log(response.status);
        if (statusCode!== 201) {
            console.log('Error occured while registering. Status ' +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        let reply = data.Status;
        console.log(data);
        if (reply === "Created") {
            console.log(data);
            
            myForm.reset();
            alert("User Created Successfully!!");
            the_next = "login.html";
            setTimeout(function () {
                nextPage(the_next)
            }, 3300);
        }
        else {
            if(statusCode === 401){
                alert(data.Status);
                console.log(data.Status);
            }
            else if(statusCode === 500){
                alert(data.message);
                console.log(data.Status);
            }
            else{
                let message = "";
                const myErrors = Object.keys(data.Errors);
                for(i=0; i<myErrors.length;i++){
                    message += data.Errors[(myErrors[i])]+"\n";
                }
                alert(message)
            }
        }
    }).catch(err => console.log(err))
}