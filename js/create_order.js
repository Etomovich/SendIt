const url = 'https://etomovich-sendit.herokuapp.com';

document.getElementById("createOrderBtn").addEventListener("click", createMyOrder);

function nextPage(page) {
    document.location.href = page;
}
/*
function createMyOrder(exe){
    exe.preventDefault();

    let orderName = document.getElementById("order_name").value;
    let myEmail = document.getElementById("order_description").value;
    let myPhone = document.getElementById("pay_mode").value;
    let myPassword = document.getElementById("payment_details").value;
    let retypePassword = document.getElementById("station").value;

    let the_next = undefined;
    let statusCode = undefined; 

    fetch(url + '/api/v2/register', {
        method: 'post',
        mode:"cors",
        headers: {
            "Content-type": "application/json; charset=utf-8",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            username: myUsername,
            email: myEmail,
            phone_number: myPhone,
            password: myPassword,
            retype_pasword: retypePassword
        })
    }).then(function (response) {
        statusCode = response.status;
        console.log(response.status);
    }*/