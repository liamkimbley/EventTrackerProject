window.addEventListener('load', function(e) {
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
				let tbody = document.createElement('tbody'); // tr and td

				th.textContent = "Date";
				trh.appendChild(th);
				th2.textContent = "Name"
				trh.appendChild(th2);
				th3.textContent = "Price"
				trh.appendChild(th3);
				th4.textContent = "Reason"
				trh.appendChild(th4);
				th5.textContent = "Description"
				trh.appendChild(th5);
				head.appendChild(trh);
				table.appendChild(head);
				for (let i = 0; i < data.length; i++) {
// anything that does anything with the data returned MUST be within this code block!!!!!
					let tr = document.createElement('tr');
					let td = document.createElement('td');
					let td2 = document.createElement('td');
					let td3 = document.createElement('td');
					let td4 = document.createElement('td');
					let td5 = document.createElement('td');

					let str = "" + data[i].date.toString();
					td.textContent = str.substr(0,10);
					tr.appendChild(td);
					td2.textContent = data[i].name;
					tr.appendChild(td2);
					td3.textContent = "$" + data[i].price;
					tr.appendChild(td3);
					td4.textContent = data[i].reason;
					tr.appendChild(td4);
					td5.textContent = data[i].description;
					tr.appendChild(td5);
					tbody.appendChild(tr);

				}
				console.log(data);
				table.appendChild(tbody);
				div.appendChild(table);
			} else if (xhr.status !== 200) {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	xhr.send(null);

});

var btn = document.getElementById('btn1');
btn1.addEventListener("click", showForm);


function showForm(e){
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

document.addEventListener('click',function(e){
	if (e.target && e.target.name === 'submit'){
		divForm.addForm.submit.addEventListener("click", submitBtn); // ********************
	}
});

function submitBtn(e){
	e.preventDefault();
	let btn = e.target;
	btn.addEventListener("click", function(e){
		btn1.addEventListener("click", showForm);
		let name = divForm.addForm.name.value;
		let price = divForm.addForm.price.value;
		let reason = divForm.addForm.reason.value;
		let desc = divForm.addForm.description.value;


	});
};
