//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return allUsers();
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

function viewNext(next_url){
    if(next_url === "END"){
        alert("This is the final page.")
    }
    else{
        let holder = document.getElementById("main-section12");
        holder.innerHTML = "";
        return allUsers(my_url=next_url);
    }    
}

function viewPrevious(prev_url){
    if(prev_url === "BEGINNING"){
        alert("This is the first page.")
    }
    else{
        let holder = document.getElementById("main-section12");
        holder.innerHTML = "";
        return allUsers(my_url=prev_url);
    } 
}

function viewUser(this_id){
    my_view_user_page = "user_info10.html";
    localStorage.setItem('view_user_id', this_id);
    nextPage(my_view_user_page);
}

function assignAdmin(this_id){
    let mess = "Note: You are about to make this user an admin.\n"
    mess =  mess + "Are you sure you want to make this user an admin??\n";
    change_role = "Admin";
    if (confirm(mess)){
        let currentPage = url + '/api/v2/user/'+String(this_id);
        fetch(currentPage, {
            method: 'put',
            mode: 'cors',
            body: JSON.stringify({
                role: change_role
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Authorization": localStorage.getItem("this_token")
            }
        }).then(function (response) {
            statusCode = response.status;
            console.log(statusCode);
            if (statusCode!== 200) {
                console.log('Error occured while changing role to user. Status ' +
                    response.status);
            }
            return response.json();
        }).then(function (data) {
            if (statusCode !== 200){
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
                    alert(message)
                }
            }
            else{
                alert("Role changed!!");
                let holder = document.getElementById("main-section12");
                holder.innerHTML = "";
                return allUsers();
            }        
        }).catch(err => console.log(err))
    }
    else{
        //do nothing...
    }

}

function assignUser(this_id){
    let mess = "Note: You are about to make this admin to user.\n"
    mess =  mess + "Are you sure you want to make this admin a user??\n";
    change_role = "User";
    if (confirm(mess)){
        let currentPage = url + '/api/v2/user/'+String(this_id);
        fetch(currentPage, {
            method: 'put',
            mode: 'cors',
            body: JSON.stringify({
                role: change_role
            }),
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Authorization": localStorage.getItem("this_token")
            }
        }).then(function (response) {
            statusCode = response.status;
            console.log(statusCode);
            if (statusCode!== 200) {
                console.log('Error occured while changing role to admin. Status ' +
                    response.status);
            }
            return response.json();
        }).then(function (data) {
            if (statusCode !== 200){
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
                    alert(message)
                }
            }
            else{
                alert("Role Changed!!");
                let holder = document.getElementById("main-section12");
                holder.innerHTML = "";
                return allUsers();
            }        
        }).catch(err => console.log(err))
    }
    else{
        //do nothing...
    }
}

function deleteUser(this_id){
    let mess = "Note: You are about to delete this user\n"
    mess =  mess + "Are you sure you want to delete this user??\n";
    if (confirm(mess)){
        let currentPage = url + '/api/v2/user/'+String(this_id);
        fetch(currentPage, {
            method: 'delete',
            headers: {
                "Content-type": "application/json; charset=utf-8",
                "Authorization": localStorage.getItem("this_token")
            }
        }).then(function (response) {
            statusCode = response.status;
            console.log(statusCode);
            if (statusCode!== 200) {
                console.log('Error occured while deleting a user. Status ' +
                    response.status);
            }
            return response.json();
        }).then(function (data) {
            if (statusCode !== 200){
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
                    alert(message)
                }
            }
            else{
                alert("User deleted!!");
                let holder = document.getElementById("main-section12");
                holder.innerHTML = "";
                return allUsers();
            }        
        }).catch(err => console.log(err))
    }
    else{
        //do nothing...
    }
}

function allUsers(my_url=false){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }
    let currentPage = undefined;
    if(my_url !== false){
        currentPage = my_url;
    }
    else{
        currentPage = currentPage = url + '/api/v2/users';
    }

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
            console.log('Error occured while fetching sendit users. Status ' +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        let the_user = data["Users"];
        if (statusCode === 200){
            let my_loop = undefined;

            let holder = document.getElementById("main-section12");

            let header_div = makeNode("div");
            header_div.classList.add("general-tables-header");
            header_div.setAttribute("id", "table-header12");

            let page_title = makeNode("h4");
            page_title.classList.add("general-tables-title");
            page_title.textContent = "All Users |"+ `${data["Total Users"]} user(s).`;
            
            the_adder(header_div,page_title);

            the_adder(holder, header_div);

            let my_parcels = makeNode("div");

            let the_loop = the_user.map(function(a_person){
                let div1 = makeNode("div");
                div1.setAttribute("id","order_parcel12");
                div1.classList.add("table-item");
                div1.classList.add("clearfix");

                let div2a = makeNode("div");
                div2a.classList.add("table-cell");

                let div2a_label1 = makeNode("label");
                div2a_label1.classList.add("item-head");
                div2a_label1.textContent = "User ID: ";

                let div2a_label2 = makeNode("label");
                div2a_label2.classList.add("item-body");
                div2a_label2.textContent = `${a_person.user_id}`;

                the_adder(div2a, div2a_label1);
                the_adder(div2a,div2a_label2);

                let div2b = makeNode("div");
                div2b.classList.add("table-cell");

                let div2b_label1 = makeNode("label");
                div2b_label1.classList.add("item-head");
                div2b_label1.textContent = "Username: ";

                let div2b_label2 = makeNode("label");
                div2b_label2.classList.add("item-body");
                div2b_label2.textContent = `${a_person.username}`;

                the_adder(div2b, div2b_label1);
                the_adder(div2b,div2b_label2);

                let div2c = makeNode("div");
                div2c.classList.add("table-cell");

                let div2c_label1 = makeNode("label");
                div2c_label1.classList.add("item-head");
                div2c_label1.textContent = "Phone: ";

                let div2c_label2 = makeNode("label");
                div2c_label2.classList.add("item-body");
                div2c_label2.textContent = `${a_person.phone_number}`;

                the_adder(div2c, div2c_label1);
                the_adder(div2c,div2c_label2);

                let div2e = makeNode("div");
                div2e.classList.add("table-cell");

                let div2e_label1 = makeNode("label");
                div2e_label1.classList.add("item-head");
                div2e_label1.textContent = "Role: ";

                let div2e_label2 = makeNode("label");
                div2e_label2.classList.add("item-body");
                div2e_label2.textContent = `${a_person.role}`;

                the_adder(div2e, div2e_label1);
                the_adder(div2e,div2e_label2);

                let div2d = makeNode("div");
                div2d.classList.add("right-set");

                //Assign Admin
                let div2d_label10 = makeNode("button");
                div2d_label10.classList.add("view-btn");
                div2d_label10.classList.add("view-align");
                div2d_label10.textContent = "Assign Admin";
                div2d_label10.setAttribute("onclick",`assignAdmin("${a_person.user_id}")`);

                if(a_person.role === "User"){
                    the_adder(div2d, div2d_label10);
                }

                //Assign User
                let div2d_label13 = makeNode("button");
                div2d_label13.classList.add("view-btn");
                div2d_label13.classList.add("view-align");
                div2d_label13.textContent = "Assign User";
                div2d_label13.setAttribute("onclick",`assignUser("${a_person.user_id}")`);

                if(a_person.role === "Admin"){
                    the_adder(div2d, div2d_label13);
                }

                //View User
                let div2d_label11 = makeNode("button");
                div2d_label11.classList.add("view-btn");
                div2d_label11.classList.add("view-align");
                div2d_label11.textContent = "View";
                div2d_label11.setAttribute("onclick",`viewUser("${a_person.user_id}")`);

                the_adder(div2d, div2d_label11);
                

                //delete User
                let div2d_label1 = makeNode("button");
                div2d_label1.classList.add("btn-error");
                div2d_label1.classList.add("view-align");
                div2d_label1.textContent = "Delete";
                div2d_label1.setAttribute("onclick",`deleteUser("${a_person.user_id}")`);

                the_adder(div2d, div2d_label1);

                the_adder(div1, div2a);
                the_adder(div1, div2b);
                the_adder(div1, div2c);
                the_adder(div1, div2e);
                the_adder(div1, div2d);
                the_adder(holder, div1);
            });
            let next_prev_buttons =  makeNode("div");
            next_prev_buttons.classList.add("next-prev");

            let prev_label1 = makeNode("button");
            prev_label1.classList.add("view-btn");
            prev_label1.textContent = "Previous";
            prev_label1.setAttribute("onclick",`viewPrevious("${data["Prev Page"]}")`);

            let next_label1 = makeNode("button");
            next_label1.classList.add("view-btn");
            next_label1.textContent = "Next";
            next_label1.setAttribute("onclick",`viewNext("${data["Next Page"]}")`);

            the_adder(next_prev_buttons, prev_label1);
            the_adder(next_prev_buttons, next_label1);

            the_adder(holder,next_prev_buttons);
        }
        else {
            if(statusCode === 401){
                alert(data.message);
                console.log(data.message);
                let the_login = "login.html";
                nextPage(the_login);
            }
            else if(statusCode === 500){
                alert(data.Status);
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