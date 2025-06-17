
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCatInput = document.getElementById('productCategory');
var productImageInput = document.getElementById('productImage');
var productDescInput = document.getElementById('productDesc');
var addProductBtn = document.getElementById('submitBtn');
var editProductBtn = document.getElementById('editBtn');

var products = [];
var updatedIndex;
if (JSON.parse(localStorage.getItem('products'))) {
  products = JSON.parse(localStorage.getItem('products'));
  displayProducts(products, 'productList');
}

function addProduct() {
  if (validateName() && validatePrice() && validateImage() && validateDescription()) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      cat: productCatInput.value,
      image: `images/products/${productImageInput.files[0].name}`,
      desc: productDescInput.value,
    }
    products.push(product);
    addToStorage();
    clearInputs();
    displayProducts(products, 'productList');
  }
  else {
    alert('Please fill all fields correctly');
  }
}
function editProduct(index) {
  updatedIndex = index;
  productNameInput.value = products[index].name;
  productPriceInput.value = products[index].price;
  productCatInput.value = products[index].cat;
  productImageInput.value = "";
  productDescInput.value = products[index].desc;
  addProductBtn.classList.add('d-none');
  editProductBtn.classList.remove('d-none');
}
function updateProduct() {
  products[updatedIndex] = {
    name: productNameInput.value,
    price: productPriceInput.value,
    cat: productCatInput.value,
    image: `images/products/${productImageInput.files[0].name}`,
    desc: productDescInput.value,
  }
  // addToStorage();
  clearInputs();
  displayProducts(products, 'productList');
  addProductBtn.classList.remove('d-none');
  editProductBtn.classList.add('d-none');
}
function clearInputs() {
  productNameInput.value = '';
  productPriceInput.value = '';
  productCatInput.value = '';
  productImageInput.value = '';
  productDescInput.value = '';
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts(products, 'productList');
}
function displayProducts(list, id) {
  var productList = ``;
  for (var i = 0; i < list.length; i++) {
    productList += `
 <div class="p-2 col-md-3">
        <div class="card pt-1">
          <img src="${list[i].image}" class="card-img-top img-fluid custom-height" alt="...">
          <div class="card-body">
            <div class="text-start"> <span class="badge text-bg-secondary">${list[i].cat}</span></div>
            <h3 class="card-title">${list[i].highlighted ? list[i].highlighted : list[i].name}</h3>
            <p class="card-text">${list[i].price}</p>
            <a href="#" class="btn btn-info" onclick="editProduct(${i})">Edit </a>
            <a href="#" class="btn btn-danger" onclick="deleteProduct(${i})">Delete</a>
          </div>
        </div>
      </div> 
`
  }
  document.getElementById(id).innerHTML = productList;
}

function addToStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function searchProducts(keyword) {
  var results = [];
  keyword.value.trim().length > 0 ? document.getElementById('searchResults').classList.remove('d-none') : document.getElementById('searchResults').classList.add('d-none');
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(keyword.value.toLowerCase()) == true) {
      results.push(products[i]);
      products[i].highlighted = products[i].name.toLowerCase().replaceAll(keyword.value, `<span class="text-danger">${keyword.value}</span>`);
      document.getElementById('foundResults').innerHTML = '';
    }

  }
  displayProducts(results, 'searchResults');
  if (results.length == 0) {
    document.getElementById('foundResults').innerHTML = 'sorry no results found';

  }

}

function validateName() {
  var nameRegex = /^[a-zA-Z ]{3,}$/; if (
    nameRegex.test(productNameInput.value)
  ) {
    document.getElementById('productName').classList.add('is-valid');
    document.getElementById('productName').classList.remove('is-invalid');
    document.getElementById('productName').nextElementSibling.classList.add('d-none');

    return true;
  }
  else {
    document.getElementById('productName').classList.add('is-invalid');
    document.getElementById('productName').classList.remove('is-valid');
    document.getElementById('productName').nextElementSibling.classList.remove('d-none');
    return false;
  }
}
function validatePrice() {
  var priceRegex = /^(6000|[6-9]\d{3}|[1-5]\d{4}|60000)$/; if (
    priceRegex.test(productPriceInput.value)
  ) {
    document.getElementById('productPrice').nextElementSibling.classList.add('d-none');

    document.getElementById('productPrice').classList.add('is-valid');
    document.getElementById('productPrice').classList.remove('is-invalid');
    return true;
  }
  else {
    document.getElementById('productPrice').nextElementSibling.classList.remove('d-none');
    document.getElementById('productPrice').classList.add('is-invalid');
    document.getElementById('productPrice').classList.remove('is-valid');
    return false;
  }
}
function validateImage() {
  var file = productImageInput.files[0];
  if (file) {
    document.getElementById('productImage').nextElementSibling.classList.add('d-none');

    document.getElementById('productImage').classList.add('is-valid');
    document.getElementById('productImage').classList.remove('is-invalid');
    return true;
  }
  else {
    document.getElementById('productImage').nextElementSibling.classList.remove('d-none');

    document.getElementById('productImage').classList.add('is-invalid');
    document.getElementById('productImage').classList.remove('is-valid');
    return false;
  }
}
function validateDescription() {
  document.getElementById('productDesc').nextElementSibling.classList.add('d-none');

  if (productDescInput.value.trim().length > 0 && productDescInput.value.trim().length < 250) {
    document.getElementById('productDesc').classList.add('is-valid');
    document.getElementById('productDesc').classList.remove('is-invalid');
    return true;
  } else {
    document.getElementById('productDesc').nextElementSibling.classList.remove('d-none');
    document.getElementById('productDesc').classList.add('is-invalid');
    document.getElementById('productDesc').classList.remove('is-valid');
    return false;
  }
}
