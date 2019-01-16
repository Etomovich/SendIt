const url = 'https://etomovich-sendit.herokuapp.com';
window.addEventListener("load", notStartedParcels);

function nextPage(page) {
    document.location.href = page;
}

function makeNode(item){
    return document.createElement(item);
}

function the_adder(container,item){
    return container.appendChild(item);
}

function notStartedParcels(e) {
    e.preventDefault();
    
    let startPage = undefined;
    let statusCode = undefined;
    fetch(url + '/api/v2/parcels/'+localStorage.getItem("this_id")+'/not-started', {
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
            console.log('Error occured while fetching not started parcels. Status ' +
                response.status);
        }
        return response.json();
    }).then(function (data) {
        console.log(data);
        let the_parcel = data["Not Started Parcels"];
        if (statusCode === 200){
            let my_loop = undefined;

            let holder = document.getElementById("main-section12");

            let header_div = makeNode("div");
            header_div.classList.add("general-tables-header");
            header_div.setAttribute("id", "table-header12");

            let page_title = makeNode("h4");
            page_title.classList.add("general-tables-title");
            page_title.textContent = "Unstarted Parcels |"+ `${data["Total Parcels"]} parcels.`;
            
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
                div2a_label1.textContent = "Parcel ID: ";

                let div2a_label2 = makeNode("label");
                div2a_label2.classList.add("item-body");
                div2a_label2.textContent = `${a_parc.parcel_id}`;

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
                div2c_label2.textContent = `${a_parc.approved}`;

                the_adder(div2c, div2c_label1);
                the_adder(div2c,div2c_label2);

                let div2d = makeNode("div");
                div2d.classList.add("right-set");

                let div2d_label1 = makeNode("a");
                div2d_label1.classList.add("view-btn");
                div2d_label1.classList.add("view-align");
                div2d_label1.textContent = "Make Order";
                div2d_label1.setAttribute("value",`${a_parc.parcel_id}`);
                div2d_label1.setAttribute("href", "create_delivery_order.html");

                the_adder(div2d, div2d_label1);

                the_adder(div1, div2a);
                the_adder(div1, div2b);
                the_adder(div1, div2c);
                the_adder(div1, div2d);
                the_adder(holder, div1);

            });
            
        }

        
    }).catch(err => console.log(err))
}