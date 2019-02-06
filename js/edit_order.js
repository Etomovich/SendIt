//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

let submit_reply12 = document.getElementById("edit_the_order22");
submit_reply12.setAttribute("onclick","editOrder()");

let the_parcels12 = document.getElementById("my_parcels22");
let the_page = "my_list_of_parcels10.html";
the_parcels12.setAttribute("onclick",`nextPage("${the_page}")`);

let the_orders12 = document.getElementById("my_orders22");
the_page = "my_list_of_orders10.html";
the_orders12.setAttribute("onclick",`nextPage("${the_page}")`);

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

function get_order_data(my_order_id){
    currentPage = currentPage = url + '/api/v2/order/' + my_order_id;

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


        localStorage.setItem('edit_11_parcel_id', parcel_id);
        localStorage.setItem('edit_11_parcel_name', parcel_name);
        localStorage.setItem('edit_11_parcel_description', parcel_description);
        localStorage.setItem('edit_11_pay_mode', pay_mode);
        localStorage.setItem('edit_11_pay_proof', pay_proof);
        localStorage.setItem('edit_11_amount_paid', amount_paid);
        localStorage.setItem('edit_11_destination', destination);

        //return data;
    }).catch(err => console.log(err))

    let reply12345 ={
        parcel_id : localStorage.getItem('edit_11_parcel_id'),
        parcel_name : localStorage.getItem('edit_11_parcel_name'),
        parcel_description : localStorage.getItem('edit_11_parcel_description'),
        pay_mode : localStorage.getItem('edit_11_pay_mode'),
        pay_proof : localStorage.getItem('edit_11_pay_proof'),
        amount_paid : localStorage.getItem('edit_11_amount_paid'),
        destination : localStorage.getItem('edit_11_destination')
    }
    
    localStorage.removeItem('edit_11_parcel_id');
    localStorage.removeItem('edit_11_parcel_name');
    localStorage.removeItem('edit_11_parcel_description');
    localStorage.removeItem('edit_11_pay_mode');
    localStorage.removeItem('edit_11_pay_proof');
    localStorage.removeItem('edit_11_amount_paid');
    localStorage.removeItem('edit_11_destination');

    return reply12345;
}

function our_display(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let my_order = get_order_data(localStorage.getItem("edit_order_id"));
    let currentPage = undefined;
    if (my_order.parcel_id === 0){
        alert("Please choose a parcel to make an order!!")
        currentPage = "my_list_of_parcels10.html";
        nextPage(currentPage);
    }
    let this_parcel_id = document.getElementById("the_parcel_id11");
    this_parcel_id.innerHTML = "Parcel ID : "+ my_order.parcel_id;

    let parcel_name_val1 = document.getElementById("parcel_name11");
    parcel_name_val1.defaultValue = my_order.parcel_name;

    let parcel_description_val1 = document.getElementById("parcel_description11");
    parcel_description_val1.defaultValue = my_order.parcel_description;

    let pay_mode_val1 = document.getElementById("pay_mode11");
    pay_mode_val1.defaultValue = my_order.pay_mode;

    let pay_proof_val1 = document.getElementById("payment_details11");
    pay_proof_val1.defaultValue = String(my_order.pay_proof);

    let amount_paid_val1 = document.getElementById("amount_paid11");
    amount_paid_val1.defaultValue = String(my_order.amount_paid);

    let destination_val1 = document.getElementById("destination11");
    destination_val1.defaultValue = my_order.destination;
    
}
 
function editOrder(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let my_order = get_order_data(localStorage.getItem("edit_order_id"));

    let currentPage = undefined;
    if (my_order.parcel_id === 0){
        alert("Please choose a parcel to view!!")
        currentPage = "my_list_of_parcels10.html";
        nextPage(currentPage);
    }
    currentPage = currentPage = url + '/api/v2/order/' + localStorage.getItem("edit_order_id");

    let parcel_name_val1 = document.getElementById("parcel_name11").value;
    let parcel_description_val1 = document.getElementById("parcel_description11").value;
    let pay_mode_val1 = document.getElementById("pay_mode11").value;
    let pay_proof_val1 = document.getElementById("payment_details11").value;
    let amount_paid_val1 = document.getElementById("amount_paid11").value;
    let destination_val1 = document.getElementById("destination11").value;

    let statusCode = undefined;
    fetch(currentPage, {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify({
            parcel_id:my_order.parcel_id,
            parcel_name: parcel_name_val1,
            parcel_description: parcel_description_val1,
            pay_mode: pay_mode_val1,
            pay_proof: pay_proof_val1,
            amount_paid: amount_paid_val1,
            destination: destination_val1
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        localStorage.removeItem("edit_order_id");
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
        else{
            currentPage = "my_list_of_parcels10.html";
            nextPage(currentPage);
        }
    }).catch(err => console.log(err))
}

