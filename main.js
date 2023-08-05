// Get Total

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let title__error = document.getElementById("title__error");

let mood = "create";

let tmp;

// ======================= get total ======================

function getTotal() {
  if (price.value != "") {
    result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// ================= Create ==================

let products;

// when I was creating a new product it deletes an old
// data so this method to store old data and stop deleting it

if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

submit.onclick = function () {
  // create an object contains products's data
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // pushing data to array to store it

  if (title.value != "") {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  } else {
    title__error.style.display = "block";
  }

  // localstorage only accept strings so we should convert data to string
  localStorage.setItem("product", JSON.stringify(products));
  clearData();
  showData();
};

// ===================== Clear Data ========================

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.value = "";
  count.value = "";
  category.value = "";
}

// ========== Read Data =================

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
        <td>${i}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
          <button onclick = "update( ${i} )" id="update">update</button>
        </td>
        <td>
          <button onclick = "deletePro( ${i} )" id="delete">delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  // ============ Clear All Products =============

  let btnDelete = document.getElementById("deleteAll");
  if (products.length > 0) {
    btnDelete.innerHTML = `
    <button onclick = "deleteAll()" id="delete">Clear All (${products.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// ============ Delete Product =============

function deletePro(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

// ============ Clear All Products =============

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

// ============ Update data =============

function update(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = products[i].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
