//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return viewParcels();
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

function viewParcels(){
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
    currentPage = currentPage = url + '/api/v2/parcels/'+localStorage.getItem("view_parc_id");

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
            content_header.textContent = "View Parcel";

            the_adder(container1, content_header);

            //Owner ID
            let owner_id_label = makeNode("label");
            let owner_id_header = makeNode("h2");
            owner_id_header.textContent = "Owner's ID:  ";
            let owner_id_body = makeNode("h4");
            owner_id_body.textContent = `${data.owner_id}`;
            the_adder(owner_id_label, owner_id_header);
            the_adder(owner_id_label, owner_id_body);

            //Parcel ID
            let parcel_id_label = makeNode("label");
            let parcel_id_header = makeNode("h2");
            parcel_id_header.textContent = "Parcel ID:  ";
            let parcel_id_body = makeNode("h4");
            parcel_id_body.textContent = `${data.parcel_id}`;
            the_adder(parcel_id_label, parcel_id_header);
            the_adder(parcel_id_label, parcel_id_body);

            //Parcel Name
            let parcel_name_label = makeNode("label");
            let parcel_name_header = makeNode("h2");
            parcel_name_header.textContent = "Parcel Name:  ";
            let parcel_name_body = makeNode("h4");
            parcel_name_body.textContent = `${data.parcel_name}`;
            the_adder(parcel_name_label, parcel_name_header);
            the_adder(parcel_name_label, parcel_name_body);

            //Submission Station
            let submission_station_label = makeNode("label");
            let submission_station_header = makeNode("h2");
            submission_station_header.textContent = "Submission Station:    ";
            let submission_station_body = makeNode("h4");
            submission_station_body.textContent = `${data.submission_station}`;
            the_adder(submission_station_label, submission_station_header);
            the_adder(submission_station_label, submission_station_body);

            //Present Location
            let present_location_label = makeNode("label");
            let present_location_header = makeNode("h2");
            present_location_header.textContent = "Present Location:    ";
            let present_location_body = makeNode("h4");
            present_location_body.textContent = `${data.present_location}`;
            the_adder(present_location_label, present_location_header);
            the_adder(present_location_label, present_location_body);

            //Weight
            let weight_label = makeNode("label");
            let weight_header = makeNode("h2");
            weight_header.textContent = "Weight:    ";
            let weight_body = makeNode("h4");
            weight_body.textContent = `${data.weight}`;
            the_adder(weight_label, weight_header);
            the_adder(weight_label, weight_body);

            //Expected Pay
            let expected_pay_label = makeNode("label");
            let expected_pay_header = makeNode("h2");
            expected_pay_header.textContent = "Expected Pay:    ";
            let expected_pay_body = makeNode("h4");
            expected_pay_body.textContent = `${data.expected_pay}`;
            the_adder(expected_pay_label, expected_pay_header);
            the_adder(expected_pay_label, expected_pay_body);

            //Order ID
            let order_id_label = makeNode("label");
            let order_id_header = makeNode("h2");
            order_id_header.textContent = "Order ID:    ";
            let order_id_body = makeNode("h4");
            order_id_body.textContent = `${data.order_id}`;
            the_adder(order_id_label, order_id_header);
            the_adder(order_id_label, order_id_body);

            //Feebacdk
            let feedback_label = makeNode("label");
            let feedback_header = makeNode("h2");
            feedback_header.textContent = "Feedback:    ";
            let feedback_body = makeNode("h4");
            feedback_body.textContent = `${data.feedback}`;
            the_adder(feedback_label, feedback_header);
            the_adder(feedback_label, feedback_body);

            //Destination
            let destination_label = makeNode("label");
            let destination_header = makeNode("h2");
            destination_header.textContent = "Destination:  ";
            let destination_body = makeNode("h4");
            destination_body.textContent = `${data.destination}`;
            the_adder(destination_label, destination_header);
            the_adder(destination_label, destination_body);

            //Submission Date
            let submission_date_label = makeNode("label");
            let submission_date_header = makeNode("h2");
            submission_date_header.textContent = "Submission Date:  ";
            let submission_date_body = makeNode("h4");
            submission_date_body.textContent = `${data.submission_date}`;
            the_adder(submission_date_label, submission_date_header);
            the_adder(submission_date_label, submission_date_body);

            //Status
            let status_label = makeNode("label");
            let status_header = makeNode("h2");
            status_header.textContent = "Status:    ";
            let status_body = makeNode("h4");
            status_body.textContent = `${data.status}`;
            the_adder(status_label, status_header);
            the_adder(status_label, status_body);

            //Approved
            let approved_label = makeNode("label");
            let approved_header = makeNode("h2");
            approved_header.textContent = "Approved:    ";
            let approved_body = makeNode("h4");
            approved_body.textContent = `${data.approved}`;
            the_adder(approved_label, approved_header);
            the_adder(approved_label, approved_body);
            
            let the_span = makeNode("span");
            if(localStorage.getItem("this_role") === "Admin"){
                let back_button = makeNode("button");
                back_button.textContent = "Parcels";
                back_button.classList.add("btn-form");
                back_button.setAttribute("onclick","nextPage('admin_all_parcels10.html');");
                the_adder(the_span, back_button);
            }
            else{
                let back_button = makeNode("button");
                back_button.textContent = "My Parcels";
                back_button.classList.add("btn-form");
                back_button.setAttribute("onclick","nextPage('my_list_of_parcels10.html');");
                the_adder(the_span, back_button);
            }

            the_adder(container1, owner_id_label);
            the_adder(container1, parcel_id_label);
            the_adder(container1, parcel_name_label);
            the_adder(container1, submission_station_label);
            the_adder(container1, present_location_label);
            the_adder(container1, weight_label);
            the_adder(container1, expected_pay_label);
            the_adder(container1, order_id_label);
            the_adder(container1, feedback_label);
            the_adder(container1, destination_label);
            the_adder(container1, submission_date_label);
            the_adder(container1, status_label);
            the_adder(container1, approved_label);
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