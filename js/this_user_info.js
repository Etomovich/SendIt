//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return viewTheUser();
}

function nextPage(page) {
    document.location.href = page;
}

function makeNode(item){
    return document.createElement(item);
}

function the_adder(container,item){
    return container.appendChild(item);
}

function viewTheUser(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let currentPage = undefined;
    if (localStorage.getItem("view_user_id")=== null){
        alert("Please choose a user to view!!")
        currentPage = "all_users10.html";
        nextPage(currentPage);
    }

    this_id = localStorage.getItem("view_user_id");
    currentPage = url + '/api/v2/user/'+String(this_id);

    let statusCode = undefined;
    fetch(currentPage, {
        method: 'get',
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching this user. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (all_data) {
        data = all_data.User;
        console.log(data);
        if (statusCode === 200){
            let holder = document.getElementById("the_holder12");

            let container1 = makeNode("div");
            container1.classList.add("view-div");

            let content_header = makeNode("h1");
            content_header.textContent = "View User";

            the_adder(container1, content_header);

            //User ID
            let user_id_label = makeNode("label");
            let user_id_header = makeNode("h2");
            user_id_header.textContent = "User's ID:  ";
            let user_id_body = makeNode("h4");
            user_id_body.textContent = `${data.user_id}`;
            the_adder(user_id_label, user_id_header);
            the_adder(user_id_label, user_id_body);


            //Username
            let username_label = makeNode("label");
            let username_header = makeNode("h2");
            username_header.textContent = "Username:  ";
            let username_body = makeNode("h4");
            username_body.textContent = `${data.username}`;
            the_adder(username_label, username_header);
            the_adder(username_label, username_body);

            //Role
            let role_label = makeNode("label");
            let role_header = makeNode("h2");
            role_header.textContent = "Role:  ";
            let role_body = makeNode("h4");
            role_body.textContent = `${data.role}`;
            the_adder(role_label, role_header);
            the_adder(role_label, role_body);

            //Email
            let email_label = makeNode("label");
            let email_header = makeNode("h2");
            email_header.textContent = "Email: ";
            let email_body = makeNode("h4");
            email_body.textContent = `${data.email}`;
            the_adder(email_label, email_header);
            the_adder(email_label, email_body);

            //Phone No
            let phone_number_label = makeNode("label");
            let phone_number_header = makeNode("h2");
            phone_number_header.textContent = "Phone Number: ";
            let phone_number_body = makeNode("h4");
            phone_number_body.textContent = `${data.phone_number}`;
            the_adder(phone_number_label, phone_number_header);
            the_adder(phone_number_label, phone_number_body);

            let the_span = makeNode("span");

            let parcel_button = makeNode("button");
            parcel_button.textContent = "Back";
            parcel_button.classList.add("btn-form");
            parcel_button.setAttribute("onclick",`nextPage('all_users10.html');`);
            the_adder(the_span, parcel_button);   

            the_adder(container1, user_id_label);
            the_adder(container1, username_label);
            the_adder(container1, role_label);
            the_adder(container1, email_label);
            the_adder(container1, phone_number_label);

            the_adder(container1, the_span);

            the_adder(holder, container1);

        }
        else {
            if(statusCode === 401){
                alert(data.message);
                console.log(data.message);
                currentPage = "login.html";
                nextPage(currentPage);
            }
            else if(statusCode === 500){
                alert(data.Status);
                console.log(data.Status);
                currentPage = "user_info10.html";
                nextPage(currentPage);
            }
            else{
                let message = "";
                const myErrors = Object.keys(data.Errors);
                for(i=0; i<myErrors.length;i++){
                    message += data.Errors[(myErrors[i])]+"\n";
                }
                alert(message)
                currentPage = "user_info10.html";
                nextPage(currentPage);
            }
        }
    }).catch(err => console.log(err))
}
