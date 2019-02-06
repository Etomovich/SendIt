//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

document.getElementById("loginButton123").addEventListener("click", loginUser);


function nextPage(page) {
    document.location.href = page;
}

function loginUser(e) {
    e.preventDefault();
    let myForm = document.getElementById("loginForm");

    let userName = myForm.elements["myName"].value;
    let userPassword = myForm.elements["myPassword"].value;
    let startPage = undefined;
    let statusCode = undefined;
    fetch(url + '/api/v2/login', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            username: userName,
            password: userPassword
        })
    }).then(function (response) {
        statusCode = response.status;
        if (statusCode!== 200) {
            console.log('Error occured while logging in. Status ' +
                response.status);
        }
        return response.json()
    }).then(function (data) {
        let reply = data.Status;
        if (reply === "Logged In.") {
            let token = data.Token;
            let role = data.role;
            let myId = data.user_id;
            localStorage.setItem('this_token', token);
            localStorage.setItem('this_role', role);
            localStorage.setItem('this_id', myId);
            console.log(token);
            console.log(role);
            console.log(myId);
            if (role === 'Admin') {
                startPage = "admin_dash10.html";
            }
            if (role === 'User') {
                startPage = "user_dashboard.html";
            }
            myForm.reset();

            setTimeout(function () {
                nextPage(startPage)
            }, 3300);
        }
        else {
            if(statusCode === 401){
                alert(data.Status);
                console.log(data.Status);
            }
            else{
                let message = "";
                const myErrors = Object.keys(data.Errors);
                for(i=0; i<myErrors.length;i++){
                    message += data.Errors[(myErrors[i])]+"\n";
                }
                alert(message);
            }
        }
    }).catch(err => console.log(err))
}

