//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

let submit_reply12 = document.getElementById("make_the_order22");
submit_reply12.setAttribute("onclick","makeAParcel()");

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
function our_display(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

}

function makeAParcel(){
    if(localStorage.getItem("this_token")=== null){
        alert("Please login to access this page!!");
        let the_login = "login.html";
        nextPage(the_login); 
    }

    let currentPage = undefined;
    currentPage = currentPage = url + '/api/v2/parcels';

    let owner_id_val1 = document.getElementById("owner_id11").value;
    let weight_val1 = document.getElementById("weight11").value;
    let parcel_name_val1 = document.getElementById("parcel_name11").value;
    let submission_station_val1 = document.getElementById("submission_station11").value;
    let present_location_val1 = document.getElementById("present_location11").value;

    let statusCode = undefined;
    fetch(currentPage, {
        method: 'post',
        body: JSON.stringify({
            owner_id: owner_id_val1,
            weight: weight_val1,
            parcel_name: parcel_name_val1,
            submission_station: submission_station_val1,
            present_location: present_location_val1
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Authorization": localStorage.getItem("this_token")
        }
    }).then(function (response) {
        statusCode = response.status;
        console.log(statusCode);
        if (statusCode!== 201) {
            console.log("Error occured while creating a parcel. Status"  +
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
            currentPage = "admin_all_parcels10.html";
            nextPage(currentPage);
        }
    }).catch(err => console.log(err))
}