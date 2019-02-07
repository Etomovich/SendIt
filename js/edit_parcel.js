//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

let submit_reply12 = document.getElementById("edit_the_parcel22");
submit_reply12.setAttribute("onclick","editTheParcel()");

let the_parcels12 = document.getElementById("my_parcels22");
let the_page = "admin_all_parcels10.html";
the_parcels12.setAttribute("onclick",`nextPage("${the_page}")`);

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

        localStorage.setItem('edit_12_parcel_id', parcel_id);
        localStorage.setItem('edit_12_parcel_name', parcel_name);
        localStorage.setItem('edit_12_weight', weight);
        localStorage.setItem('edit_12_destination', destination);
        localStorage.setItem('edit_12_expected_pay', expected_pay);
        localStorage.setItem('edit_12_submission_station', submission_station);
        localStorage.setItem('edit_12_feedback', feedback);
        localStorage.setItem('edit_12_owner_id', owner_id);
        localStorage.setItem('edit_12_present_location', present_location);
        

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
        present_location : localStorage.getItem('edit_12_present_location')

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

    return reply12345;
}

function our_display(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let the_parcel = get_parcel_data(localStorage.getItem("edit_parcel_id1"));
    let currentPage = undefined;
    if (the_parcel.parcel_id === 0){
        alert("Please choose a parcel to update!!")
        currentPage = "admin_all_parcels10.html";
        nextPage(currentPage);
    }
    let this_parcel_id = document.getElementById("the_parcel_id11");
    this_parcel_id.innerHTML = "Parcel ID : "+ the_parcel.parcel_id;

    let parcel_name_val1 = document.getElementById("parcel_name11");
    parcel_name_val1.defaultValue = the_parcel.parcel_name;

    let weight_val1 = document.getElementById("weight11");
    weight_val1.defaultValue = the_parcel.weight;

    let destination_val1 = document.getElementById("destination11");
    destination_val1.defaultValue = the_parcel.destination;

    let expected_pay_val1 = document.getElementById("expected_pay11");
    expected_pay_val1.defaultValue = the_parcel.expected_pay;

    let submission_station_val1 = document.getElementById("submission_station11");
    submission_station_val1.defaultValue = the_parcel.submission_station;

    let feedback_val1 = document.getElementById("feedback11");
    feedback_val1.defaultValue = the_parcel.feedback;

    let owner_id_val1 = document.getElementById("owner_id11");
    owner_id_val1.defaultValue = the_parcel.owner_id;

    let present_location_val1 = document.getElementById("present_location11");
    present_location_val1.defaultValue = the_parcel.present_location;

 
}

function editTheParcel(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let the_parcel = get_parcel_data(localStorage.getItem("edit_parcel_id1"));

    let currentPage = undefined;
    if (the_parcel.parcel_id === 0){
        alert("Please choose a parcel to edit!!")
        currentPage = "admin_all_parcels10.html";
        nextPage(currentPage);
    }
    currentPage = currentPage = url + '/api/v2/parcels/' + localStorage.getItem("edit_parcel_id1");

    let parcel_name_val1 = document.getElementById("parcel_name11").value;
    let weight_val1 = document.getElementById("weight11").value;
    let destination_val1 = document.getElementById("destination11").value;
    let expected_pay_val1 = document.getElementById("expected_pay11").value;
    let submission_station_val1 = document.getElementById("submission_station11").value;
    let feedback_val1 = document.getElementById("feedback11").value;
    let owner_id_val1 = document.getElementById("owner_id11").value;
    let present_location_val1 = document.getElementById("present_location11").value;

    let statusCode = undefined;
    fetch(currentPage, {
        method: 'put',
        mode: 'cors',
        body: JSON.stringify({
            parcel_name : parcel_name_val1,
            weight : weight_val1,
            destination : destination_val1,
            expected_pay : expected_pay_val1,
            submission_station : submission_station_val1,
            feedback : feedback_val1,
            owner_id : owner_id_val1,
            present_location : present_location_val1,
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        localStorage.removeItem("edit_parcel_id1");
        console.log(statusCode);
        if (statusCode!== 200) {
            console.log("Error occured while fetching user's parcel. Status"  +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        if(statusCode !== 200){
            if(statusCode === 401){
                alert(data.message);
                console.log(data.message);
                //let the_login = "login.html";
                //nextPage(the_login);
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
            currentPage = "admin_all_parcels10.html";
            nextPage(currentPage);
        }
    }).catch(err => console.log(err))
}