window.addEventListener('load', pageLoad);

function pageLoad(e) {
  console.log("loaded");

  var xhr = new XMLHttpRequest();
  xhr.open('GET', "/api/expenses");
  // true can be left off. it will default to true. but don't set to false ===
  // response blocking

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        let div = document.getElementById('divId');
        let table = document.createElement('table');
        let head = document.createElement('thead'); // tr and th
        let trh = document.createElement('tr');
        let th = document.createElement('th');
        let th2 = document.createElement('th');
        let th3 = document.createElement('th');
        let th4 = document.createElement('th');
        let th5 = document.createElement('th');
        let th6 = document.createElement('th');
        let tbody = document.createElement('tbody'); // tr and td
				let total = 0.00;

				table.name ="table";
				th6.textContent = "ID";
				trh.appendChild(th6);
        th.textContent = "Date";
        trh.appendChild(th);
        th2.textContent = "Name"
        trh.appendChild(th2);
        th3.textContent = "Price"
        trh.appendChild(th3);
        head.appendChild(trh);
        table.appendChild(head);
        for (let i = 0; i < data.length; i++) {
          // anything that does anything with the data returned MUST be within this code block!!!!!
					let prc = parseFloat(data[i].price);
					if(!isNaN(prc)){
						total += prc;
					};

          let tr = document.createElement('tr');
          let td = document.createElement('td');
          let td2 = document.createElement('td');
          let td3 = document.createElement('td');
          let td6 = document.createElement('td');

					td6.textContent = data[i].id;
					tr.appendChild(td6);
          let str = "" + data[i].date.toString();
          td.textContent = str.substr(0, 10);
          tr.appendChild(td);
          td2.textContent = data[i].name;
          tr.appendChild(td2);
          td3.textContent = "$" + data[i].price;
          tr.appendChild(td3);
          tbody.appendChild(tr);

					tr.addEventListener("click", function(e) {
						console.log("table");

								 let element = e.target;
								 let id = element.id;
								 let pdiv = document.getElementById("detail");

								 document.getElementById("entryId").textContent = data[i].id;
								 document.getElementById("date").textContent = str.substr(0, 10);
								 document.getElementById("name").textContent = data[i].name;
								 document.getElementById("price").textContent = data[i].price;
								 document.getElementById("reason").textContent = data[i].reason;
								 document.getElementById("desc").textContent = data[i].description;

								 document.getElementById("ebtn").style = "";
								 document.getElementById("dbtn").style = "";

								//  if (pdiv.lastElementChild.name !== "delete"){
								// 	 let subInput = document.createElement("input");
								//    subInput.name = "edit";
								//    subInput.type = "submit";
								// 	 subInput.id = "subId";
								// 	 subInput.onClick = function(e){
								// 		 console.log("edit");
								// 	 };
								//    subInput.value = "Edit Entry";
								//    pdiv.appendChild(subInput);
								// 	 let delInput = document.createElement("input");
								//    delInput.name = "delete";
								//    delInput.type = "submit";
								//    delInput.value = "Delete Entry";
								//    pdiv.appendChild(delInput);
							 // }
					 })
        }
        console.log(data);
        table.appendChild(tbody);
        div.appendChild(table);
				document.getElementById("total").textContent = "Total Spent: $" + total;
      } else if (xhr.status !== 200) {
        console.error(xhr.status + ': ' + xhr.responseText);
      }
    }
  };
  xhr.send(null);

};

var btn = document.getElementById('btn1');
btn1.addEventListener("click", showForm);


function showForm(e) {
  btn1.removeEventListener("click", showForm);
  let divForm = document.getElementById("formDiv");
  let form = document.createElement("form");
  form.name = "addForm";
  let nameInput = document.createElement("input");
  nameInput.name = "name";
  nameInput.type = "text";
  nameInput.placeholder = "Name of Expense"
  form.appendChild(nameInput);
  let priceInput = document.createElement("input");
  priceInput.name = "price";
  priceInput.type = "text";
  priceInput.placeholder = "Price"
  form.appendChild(priceInput);
  let resInput = document.createElement("input");
  resInput.name = "reason";
  resInput.type = "text";
  resInput.placeholder = "Reason"
  form.appendChild(resInput);
  let descInput = document.createElement("input");
  descInput.name = "description";
  descInput.type = "text";
  descInput.placeholder = "Description"
  form.appendChild(descInput);
  let subInput = document.createElement("input");
  subInput.name = "submit";
  subInput.type = "submit";
  subInput.value = "Submit";
  form.appendChild(subInput);
  divForm.appendChild(form);

};

document.addEventListener('click', function(e) {
  if (e.target && e.target.name === 'submit') {
    e.preventDefault();
    console.log("Submit");
    let name = formDiv.firstElementChild.name.value;
    let price = formDiv.firstElementChild.price.value;
    let reason = formDiv.firstElementChild.reason.value;
    let desc = formDiv.firstElementChild.description.value;

    let pre = parseFloat(price);
    let err = formPop(name, pre);

    if (err.length > 0) {
      let divForm = document.getElementById("formDiv");
      let ol = document.createElement("ol");

      for (let i = 0; i < err.length; i++) {
        var li = document.createElement("li");
        li.textContent = err[i];
        li.style.color = "red";
        ol.appendChild(li);
        divForm.nextElementSibling.appendChild(ol);
        // console.log(err[i]);
      }
    } else {
      // console.log(name);
      // console.log(reason);
      // let form = ;
			// console.log(form);
			let formJson = JSON.stringify({
				"name": name,
				"price": price,
				"description": desc,
				"reason": reason
			});
      var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			console.log(formJson);
      xhr.open('POST', "/api/expenses");
 			xhr.setRequestHeader("Content-Type", "application/json");
			console.log("1 " +xhr.readyState); //***********
			xhr.send(formJson);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
					console.log("2 " +xhr.readyState); //***********

          if (xhr.status === 201) {
						console.log("3 " +xhr.readyState); //***********
						document.location.reload();

          } else if (xhr.status !== 200) {
            console.error(xhr.status + ': ' + xhr.responseText);
          }
        }
      };
    }

  };
}); // ********************

var editBtn = document.getElementById('ebtn');
editBtn.addEventListener("click", editEntry);
var delBtn = document.getElementById('dbtn');
delBtn.addEventListener("click", deleteEntry);

function formPop(str, dub) {
  let arr = [];
  if (str === "") {
    arr.push("Name Field Can Not Be Blank")
  };
  if (isNaN(dub)) {
    arr.push("Please Enter A Valid Price")
  };
  return arr;
};

function editEntry(e){
	e.preventDefault();
	let ed = e.target;
	let eid = ed.id;
	console.log("edit");
	let dive = document.getElementById("detail");
	let id = dive.firstElementChild.textContent;
	let name = dive.firstElementChild.nextElementSibling.nextElementSibling.textContent;
	let price = dive.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
	let reason = dive.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
	let desc = dive.lastElementChild.previousElementSibling.previousElementSibling.textContent;
	console.log(price);
	let pre = parseFloat(price);
	let err = formPop(name, pre);

	console.log(name);
	console.log(reason);
	if (err.length > 0) {
		let divForm = document.getElementById("formDiv");
		let ol = document.createElement("ol");

		for (let i = 0; i < err.length; i++) {
			var li = document.createElement("li");
			li.textContent = err[i];
			li.style.color = "red";
			ol.appendChild(li);
			divForm.nextElementSibling.appendChild(ol);
			// console.log(err[i]);
		}
	} else {
		// console.log(name);
		// console.log(reason);
		// let form = ;
		// console.log(form);
		let formJson = JSON.stringify({
			"name": name,
			"price": price,
			"description": desc,
			"reason": reason
		});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		console.log(formJson);
		xhr.open('PUT', "/api/expenses/" + id);
		xhr.setRequestHeader("Content-Type", "application/json");
		console.log("1 " +xhr.readyState); //***********
		xhr.send(formJson);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				console.log("2 " +xhr.readyState); //***********

				if (xhr.status === 201) {
					console.log("3 " +xhr.readyState); //***********
					document.location.reload();

				} else if (xhr.status !== 200) {
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		};
	}

}

function deleteEntry(e){
	e.preventDefault();
	let inpt = confirm("Are you sure you want to delete the content?");
	if (inpt){
		let ed = e.target;
		let eid = ed.id;
		console.log("delete");
		let dive = document.getElementById("detail");
		let id = dive.firstElementChild.textContent;
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.open('DELETE', "/api/expenses/" + id);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {

				if (xhr.status === 201) {
					document.location.reload();

				} else if (xhr.status !== 200) {
					console.error(xhr.status + ': ' + xhr.responseText);
				}
			}
		};
	}
}