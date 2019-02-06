//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return our_display();
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

let submit_reply12 = document.getElementById("process_the_order22");
submit_reply12.setAttribute("onclick","processOrder()");

let view_this_order12 = document.getElementById("view_this_order22");
view_this_order12.setAttribute("onclick",`viewOrder(${localStorage.getItem("process_order_id")})`);

let view_this_parcel12 = document.getElementById("view_this_parcel22");
view_this_parcel12.setAttribute("onclick",`viewParcel(${localStorage.getItem("process_parcel_id")})`);

let edit_this_parcel12 = document.getElementById("edit_this_parcel22");
edit_this_parcel12.setAttribute("onclick",`editParcel(${localStorage.getItem("process_parcel_id")})`);

function viewOrder(my_order_id){
    my_view_order_page = "view_order10.html";
    localStorage.setItem('view_order_id', my_order_id);
    nextPage(my_view_order_page);
}

function viewParcel(my_parc_id){
    my_view_parcel_page = "view_parcel10.html";
    localStorage.setItem('view_parc_id', my_parc_id);
    nextPage(my_view_parcel_page);    
}

function editParcel(my_parc_id){
    my_view_parcel_page = "edit_parcel10.html";
    localStorage.setItem('edit_parcel_id1', my_parc_id);
    nextPage(my_view_parcel_page);    
}

function processOrder(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let this_order = get_order_data(localStorage.getItem("process_order_id"));
    let this_parcel = get_parcel_data(localStorage.getItem("process_parcel_id"));

    if ((this_order.order_id === 0) || (this_parcel.parcel_id === 0)){
        alert("Please choose a an order to process!!")
        currentPage = "unprocessed_orders10.html";
        nextPage(currentPage);
    }

    let order_status1 = document.getElementById("order_status11").value;
    let approved1 = document.getElementById("approved11").value;
    let feedback1 = document.getElementById("feedback11").value;

    let parcel_status = document.getElementById("parcel_status11").value;

    let statusCode = undefined;
    currentPage = url + '/api/v2/order/process/' + localStorage.getItem("process_order_id");
    fetch(currentPage, {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify({
            order_status: order_status1,
            feedback: feedback1,
            approved: approved1
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching user's order. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        if(statusCode !== 200){
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
                alert(message);
            }
        }
    }).catch(err => console.log(err))

    //Status change
    currentPage = url + '/api/v2/parcels/' + localStorage.getItem("process_parcel_id");
    fetch(currentPage, {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify({
            status: parcel_status
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching user's order. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        if(statusCode !== 200){
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
                alert(message);
            }
        }
        
    }).catch(err => console.log(err))

}

function get_order_data(my_order_id){
    currentPage = currentPage = url + '/api/v2/admin/order/' + my_order_id;

    fetch(currentPage, {
        method: 'get',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching user's order. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        let parcel_id = `${data.parcel_id}`;
        let parcel_name = `${data.parcel_name}`;
        let parcel_description = `${data.parcel_description}`;
        let pay_mode = `${data.pay_mode}`;
        let pay_proof = `${data.pay_proof}`;
        let amount_paid = `${data.amount_paid}`;
        let destination = `${data.destination}`;
        let order_status = `${data.order_status}`;
        let feedback = `${data.feedback}`


        localStorage.setItem('edit_11_parcel_id', parcel_id);
        localStorage.setItem('edit_11_parcel_name', parcel_name);
        localStorage.setItem('edit_11_parcel_description', parcel_description);
        localStorage.setItem('edit_11_pay_mode', pay_mode);
        localStorage.setItem('edit_11_pay_proof', pay_proof);
        localStorage.setItem('edit_11_amount_paid', amount_paid);
        localStorage.setItem('edit_11_destination', destination);
        localStorage.setItem('edit_11_order_status', order_status);
        localStorage.setItem('edit_11_feedback', feedback);

        //return data;
    }).catch(err => console.log(err))

    let reply12345 ={
        parcel_id : localStorage.getItem('edit_11_parcel_id'),
        parcel_name : localStorage.getItem('edit_11_parcel_name'),
        parcel_description : localStorage.getItem('edit_11_parcel_description'),
        pay_mode : localStorage.getItem('edit_11_pay_mode'),
        pay_proof : localStorage.getItem('edit_11_pay_proof'),
        amount_paid : localStorage.getItem('edit_11_amount_paid'),
        destination : localStorage.getItem('edit_11_destination'),
        order_status : localStorage.getItem('edit_11_order_status'),
        feedback : localStorage.getItem('edit_11_feedback')
    }
    
    localStorage.removeItem('edit_11_parcel_id');
    localStorage.removeItem('edit_11_parcel_name');
    localStorage.removeItem('edit_11_parcel_description');
    localStorage.removeItem('edit_11_pay_mode');
    localStorage.removeItem('edit_11_pay_proof');
    localStorage.removeItem('edit_11_amount_paid');
    localStorage.removeItem('edit_11_destination');
    localStorage.removeItem('edit_11_order_status');
    localStorage.removeItem('edit_11_feedback');

    return reply12345;
}

function get_parcel_data(my_parcel_id){
    currentPage = currentPage = url + '/api/v2/parcels/' + my_parcel_id;

    fetch(currentPage, {
        method: 'get',
        mode: 'cors',
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching user's parcel. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        let parcel_id = `${data.parcel_id}`;
        let parcel_name = `${data.parcel_name}`;
        let weight = `${data.weight}`;
        let destination= `${data.destination}`;
        let expected_pay = `${data.expected_pay}`;
        let submission_station = `${data.submission_station}`;
        let feedback = `${data.feedback}`;
        let owner_id = `${data.owner_id}`;
        let present_location = `${data.present_location}`;
        let status = `${data.status}`;
        let approved = `${data.approved}`;

        localStorage.setItem('edit_12_parcel_id', parcel_id);
        localStorage.setItem('edit_12_parcel_name', parcel_name);
        localStorage.setItem('edit_12_weight', weight);
        localStorage.setItem('edit_12_destination', destination);
        localStorage.setItem('edit_12_expected_pay', expected_pay);
        localStorage.setItem('edit_12_submission_station', submission_station);
        localStorage.setItem('edit_12_feedback', feedback);
        localStorage.setItem('edit_12_owner_id', owner_id);
        localStorage.setItem('edit_12_present_location', present_location);
        localStorage.setItem('edit_12_status', status);
        localStorage.setItem('edit_12_approved', approved);
        

        //return data;
    }).catch(err => console.log(err))

    let reply12345 ={
        parcel_id : localStorage.getItem('edit_12_parcel_id'),
        parcel_name : localStorage.getItem('edit_12_parcel_name'),
        weight : localStorage.getItem('edit_12_weight'),
        destination : localStorage.getItem('edit_12_destination'),
        expected_pay : localStorage.getItem('edit_12_expected_pay'),
        submission_station : localStorage.getItem('edit_12_submission_station'),
        feedback : localStorage.getItem('edit_12_feedback'),
        owner_id : localStorage.getItem('edit_12_owner_id'),
        present_location : localStorage.getItem('edit_12_present_location'),
        status : localStorage.getItem('edit_12_status'),
        approved : localStorage.getItem('edit_12_approved')
    }
    
    localStorage.removeItem('edit_12_parcel_id');
    localStorage.removeItem('edit_12_parcel_name');
    localStorage.removeItem('edit_12_weight');
    localStorage.removeItem('edit_12_destination');
    localStorage.removeItem('edit_12_expected_pay');
    localStorage.removeItem('edit_12_submission_station');
    localStorage.removeItem('edit_12_feedback');
    localStorage.removeItem('edit_12_owner_id');
    localStorage.removeItem('edit_12_present_location');
    localStorage.removeItem('edit_12_status');
    localStorage.removeItem('edit_12_approved');

    return reply12345;
}

function our_display(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let this_order = get_order_data(localStorage.getItem("process_order_id"));
    let this_parcel = get_parcel_data(localStorage.getItem("process_parcel_id"));

    let currentPage = undefined;
    if ((this_order.order_id === 0) || (this_parcel.parcel_id === 0)){
        alert("Please choose a an order to process!!")
        currentPage = "unprocessed_orders10.html";
        nextPage(currentPage);
    }
    let this_order_id = document.getElementById("the_order_id11");
    this_order_id.innerHTML = "Order ID : "+ localStorage.getItem("process_order_id");

    let this_parcel_id = document.getElementById("the_parcel_id11");
    this_parcel_id.innerHTML = "Parcel ID : "+ localStorage.getItem("process_parcel_id");

    let this_parcel_name = document.getElementById("the_parcel_name11");
    this_parcel_name.innerHTML = "Parcel Name : "+ this_parcel.parcel_name;

    let order_status1 = document.getElementById("order_status11");

    for (let count = 0; count<order_status1.length;count++){
        if(order_status1.options[count].value === this_order.order_status){
            order_status1.selectedIndex = count;
            break;
        }
    }

    let parcel_status1 = document.getElementById("parcel_status11");
    if(this_parcel.approved === "approved"){
        for (let count = 0; count<parcel_status1.length;count++){
            if(parcel_status1.options[count].value === this_parcel.status){
                parcel_status1.selectedIndex = count;
                break;
            }
        }
    }
    else{
        parcel_status1.style.display = "hidden";
    }
    let approved1 = document.getElementById("approved11");
    for (let count = 0; count<approved1.length;count++){
        if(approved1.options[count].value === this_parcel.approved){
            approved1.selectedIndex = count;
            break;
        }
    }
    if(this_order.feedback !== undefined){
        let feedback1 = document.getElementById("feedback11");
        feedback1.defaultValue = this_order.feedback;
    }
    
}

