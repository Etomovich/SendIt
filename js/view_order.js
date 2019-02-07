//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return viewOrder();
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

function viewOrder(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let currentPage = undefined;
    if (localStorage.getItem("view_order_id")=== null){
        alert("Please choose an order to view!!")
        currentPage = "my_list_of_orders10.html";
        nextPage(currentPage);
    }
    if (localStorage.getItem("this_role") === "Admin"){
        currentPage = currentPage = url + '/api/v2/admin/order/'+localStorage.getItem("view_order_id");
    }
    else{
        currentPage = currentPage = url + '/api/v2/order/'+localStorage.getItem("view_order_id");
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
            console.log("Error occured while fetching user's parcels. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        if (statusCode === 200){
            let holder = document.getElementById("the_holder12");

            let container1 = makeNode("div");
            container1.classList.add("view-div");

            let content_header = makeNode("h1");
            content_header.textContent = "View Order";

            the_adder(container1, content_header);

            //Order ID
            let order_id_label = makeNode("label");
            let order_id_header = makeNode("h2");
            order_id_header.textContent = "Order's ID:  ";
            let order_id_body = makeNode("h4");
            order_id_body.textContent = `${data.order_id}`;
            the_adder(order_id_label, order_id_header);
            the_adder(order_id_label, order_id_body);


            //Parcel Name
            let parcel_name_label = makeNode("label");
            let parcel_name_header = makeNode("h2");
            parcel_name_header.textContent = "Parcel Name:  ";
            let parcel_name_body = makeNode("h4");
            parcel_name_body.textContent = `${data.parcel_name}`;
            the_adder(parcel_name_label, parcel_name_header);
            the_adder(parcel_name_label, parcel_name_body);

            //Parcel ID
            let parcel_id_label = makeNode("label");
            let parcel_id_header = makeNode("h2");
            parcel_id_header.textContent = "Parcel ID:  ";
            let parcel_id_body = makeNode("h4");
            parcel_id_body.textContent = `${data.parcel_id}`;
            the_adder(parcel_id_label, parcel_id_header);
            the_adder(parcel_id_label, parcel_id_body);

            //Parcel Description
            let parcel_description_label = makeNode("label");
            let parcel_description_header = makeNode("h2");
            parcel_description_header.textContent = "Parcel Description: ";
            let parcel_description_body = makeNode("h4");
            parcel_description_body.textContent = `${data.parcel_description}`;
            the_adder(parcel_description_label, parcel_description_header);
            the_adder(parcel_description_label, parcel_description_body);

            //Destination
            let destination_label = makeNode("label");
            let destination_header = makeNode("h2");
            destination_header.textContent = "Destination: ";
            let destination_body = makeNode("h4");
            destination_body.textContent = `${data.destination}`;
            the_adder(destination_label, destination_header);
            the_adder(destination_label, destination_body);

            //Order Status
            let order_status_label = makeNode("label");
            let order_status_header = makeNode("h2");
            order_status_header.textContent = "Order Status: ";
            let order_status_body = makeNode("h4");
            order_status_body.textContent = `${data.order_status}`;
            the_adder(order_status_label, order_status_header);
            the_adder(order_status_label, order_status_body);

            //Amount Paid
            let amount_paid_label = makeNode("label");
            let amount_paid_header = makeNode("h2");
            amount_paid_header.textContent = "Amount Paid: ";
            let amount_paid_body = makeNode("h4");
            amount_paid_body.textContent = `${data.amount_paid}`;
            the_adder(amount_paid_label, amount_paid_header);
            the_adder(amount_paid_label, amount_paid_body);

            //Pay Mode
            let pay_mode_label = makeNode("label");
            let pay_mode_header = makeNode("h2");
            pay_mode_header.textContent = "Pay Mode: ";
            let pay_mode_body = makeNode("h4");
            pay_mode_body.textContent = `${data.pay_mode}`;
            the_adder(pay_mode_label, pay_mode_header);
            the_adder(pay_mode_label, pay_mode_body);

            //Pay Proof
            let pay_proof_label = makeNode("label");
            let pay_proof_header = makeNode("h2");
            pay_proof_header.textContent = "Payment Proof: ";
            let pay_proof_body = makeNode("h4");
            pay_proof_body.textContent = `${data.pay_proof}`;
            the_adder(pay_proof_label, pay_proof_header);
            the_adder(pay_proof_label, pay_proof_body);

            //Owner ID
            let owner_id_label = makeNode("label");
            let owner_id_header = makeNode("h2");
            owner_id_header.textContent = "Owner ID: ";
            let owner_id_body = makeNode("h4");
            owner_id_body.textContent = `${data.owner_id}`;
            the_adder(owner_id_label, owner_id_header);
            the_adder(owner_id_label, owner_id_body);

            //Submitted
            let submitted_label = makeNode("label");
            let submitted_header = makeNode("h2");
            submitted_header.textContent = "Submitted: ";
            let submitted_body = makeNode("h4");
            submitted_body.textContent = `${data.submitted}`;
            the_adder(submitted_label, submitted_header);
            the_adder(submitted_label, submitted_body);

            //Feedback
            let feedback_label = makeNode("label");
            let feedback_header = makeNode("h2");
            feedback_header.textContent = "Feedback: ";
            let feedback_body = makeNode("h4");
            feedback_body.textContent = `${data.feedback}`;
            the_adder(feedback_label, feedback_header);
            the_adder(feedback_label, feedback_body);

            let the_span = makeNode("span");

            if (localStorage.getItem("this_role") === "Admin"){
                let back_button = makeNode("button");
                back_button.textContent = "All Orders";
                back_button.classList.add("btn-form");
                back_button.setAttribute("onclick","nextPage('admin_all_orders10.html');");
                the_adder(the_span, back_button);
            }
            else{
                let back_button = makeNode("button");
                back_button.textContent = "My Orders";
                back_button.classList.add("btn-form");
                back_button.setAttribute("onclick","nextPage('my_list_of_orders10.html');");
                the_adder(the_span, back_button);
            }

            the_adder(container1, order_id_label);
            the_adder(container1, parcel_name_label);
            the_adder(container1, parcel_id_label);
            the_adder(container1, parcel_description_label);
            if (localStorage.getItem("this_role") === "Admin"){
                the_adder(container1, owner_id_label);
                the_adder(container1, submitted_label);
            }
            the_adder(container1, destination_label);
            the_adder(container1, order_status_label);
            the_adder(container1, amount_paid_label);
            the_adder(container1, pay_mode_label);
            the_adder(container1, pay_proof_label);
            the_adder(container1, feedback_label);
            the_adder(container1, the_span);

            the_adder(holder, container1);

        }
        else {
            if(statusCode === 401){
                alert(data.message);
                console.log(data.message);
                currentPage = "my_list_of_parcels10.html";
                nextPage(currentPage);
            }
            else if(statusCode === 500){
                alert(data.Status);
                console.log(data.Status);
                currentPage = "my_list_of_parcels10.html";
                nextPage(currentPage);
            }
            else{
                let message = "";
                const myErrors = Object.keys(data.Errors);
                for(i=0; i<myErrors.length;i++){
                    message += data.Errors[(myErrors[i])]+"\n";
                }
                alert(message)
                currentPage = "my_list_of_parcels10.html";
                nextPage(currentPage);
            }
        }
    }).catch(err => console.log(err))
}


