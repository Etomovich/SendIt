//const url = 'http://127.0.0.1:5000';
let url = "https://etomovich-sendit.herokuapp.com";

window.addEventListener("load", startPoint);

function startPoint(e){
    e.preventDefault();
    return myProcessedOrders();
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
        return myParcels(my_url=next_url);
    }    
}

function viewPrevious(prev_url){
    if(prev_url === "BEGINNING"){
        alert("This is the first page.")
    }
    else{
        let holder = document.getElementById("main-section12");
        holder.innerHTML = "";
        return myParcels(my_url=prev_url);
    } 
}

function userViewOrder(my_order_id){
    my_view_order_page = "view_order10.html";
    localStorage.setItem('view_order_id', my_order_id);
    nextPage(my_view_order_page);
}

function myProcessedOrders(my_url=false) {
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
        currentPage = currentPage = url + '/api/v2/orders/'+localStorage.getItem("this_id")+'/processed';
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
            console.log('Error occured while fetching not started parcels. Status ' +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data)
        let the_parcel = data["Orders"];
        if (statusCode === 200){
            let my_loop = undefined;

            let holder = document.getElementById("main-section12");

            let header_div = makeNode("div");
            header_div.classList.add("general-tables-header");
            header_div.setAttribute("id", "table-header12");

            let page_title = makeNode("h4");
            page_title.classList.add("general-tables-title");
            page_title.textContent = "Processed Orders |"+ `${data["Total Orders"]} Order(s).`;
            
            the_adder(header_div,page_title);

            the_adder(holder, header_div);
            let the_loop = the_parcel.map(function(a_parc){
                let div1 = makeNode("div");
                div1.setAttribute("id","order_parcel12");
                div1.classList.add("table-item");
                div1.classList.add("clearfix");

                let div2a = makeNode("div");
                div2a.classList.add("table-cell");

                let div2a_label1 = makeNode("label");
                div2a_label1.classList.add("item-head");
                div2a_label1.textContent = "Order ID: ";

                let div2a_label2 = makeNode("label");
                div2a_label2.classList.add("item-body");
                div2a_label2.textContent = `${a_parc.order_id}`;

                the_adder(div2a, div2a_label1);
                the_adder(div2a,div2a_label2);

                let div2b = makeNode("div");
                div2b.classList.add("table-cell");

                let div2b_label1 = makeNode("label");
                div2b_label1.classList.add("item-head");
                div2b_label1.textContent = "Parcel Name: ";

                let div2b_label2 = makeNode("label");
                div2b_label2.classList.add("item-body");
                div2b_label2.textContent = `${a_parc.parcel_name}`;

                the_adder(div2b, div2b_label1);
                the_adder(div2b,div2b_label2);

                let div2c = makeNode("div");
                div2c.classList.add("table-cell");

                let div2c_label1 = makeNode("label");
                div2c_label1.classList.add("item-head");
                div2c_label1.textContent = "Approved: ";

                let div2c_label2 = makeNode("label");
                div2c_label2.classList.add("item-body");
                div2c_label2.textContent = `${a_parc.order_status}`;

                the_adder(div2c, div2c_label1);
                the_adder(div2c,div2c_label2);

                let div2d = makeNode("div");
                div2d.classList.add("right-set");

                //view parcel
                div2d_label10 = makeNode("button");
                div2d_label10.classList.add("view-btn");
                div2d_label10.classList.add("view-align");
                div2d_label10.textContent = "View Order";
                div2d_label10.setAttribute("onclick",`userViewOrder("${a_parc.order_id}")`);

                the_adder(div2d, div2d_label10);

                the_adder(div1, div2a);
                the_adder(div1, div2b);
                the_adder(div1, div2c);
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

    }).catch(err => console.log(err))

}