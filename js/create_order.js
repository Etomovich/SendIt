//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

let submit_reply12 = document.getElementById("make_the_order22");
submit_reply12.setAttribute("onclick","makeOrder()");

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
function our_display(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let currentPage = undefined;
    if (localStorage.getItem("make_order_parc_id")=== null){
        alert("Please choose a parcel to make an order!!")
        currentPage = "my_list_of_parcels10.html";
        nextPage(currentPage);
    }
    let this_parcel_id = document.getElementById("the_parcel_id11");
    this_parcel_id.innerHTML = "Parcel ID : "+ localStorage.getItem("make_order_parc_id");
}
 
function makeOrder(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let currentPage = undefined;
    if (localStorage.getItem("view_parc_id")=== null){
        alert("Please choose a parcel to view!!")
        currentPage = "my_list_of_parcels10.html";
        nextPage(currentPage);
    }
    currentPage = currentPage = url + '/api/v2/orders';

    let parcel_name_val1 = document.getElementById("parcel_name11").value;
    let parcel_description_val1 = document.getElementById("parcel_description11").value;
    let pay_mode_val1 = document.getElementById("pay_mode11").value;
    let pay_proof_val1 = document.getElementById("payment_details11").value;
    let amount_paid_val1 = document.getElementById("amount_paid11").value;
    let destination_val1 = document.getElementById("destination11").value;

    let statusCode = undefined;
    fetch(currentPage, {
        method: 'post',
        body: JSON.stringify({
            parcel_id: parseInt(localStorage.getItem("make_order_parc_id"),10),
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
        localStorage.removeItem("make_order_parc_id");
        console.log(statusCode);
        if (statusCode!== 201) {
            console.log("Error occured while fetching user's parcels. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        if(statusCode !== 201){
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


