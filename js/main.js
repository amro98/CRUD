var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");

var productsContainer = [];//2

var currentIndex ; //8

var addBtn = document.getElementById('mainBtn'); //8



//5
if(localStorage.getItem('ourProducts') != null )
{
  productsContainer = JSON.parse( localStorage.getItem('ourProducts'));
  displayProducts ();
}


//1
function addProduct() {

  //9
  if( validateProductName() == true)//9
  {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
  //2
    productsContainer.push(product);
    
    localStorage.setItem('ourProducts' , JSON.stringify( productsContainer));//5
  
    console.log(productsContainer);
    displayProducts ();
    clearForm();
  }
  
}
//3
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}
//4
function displayProducts () {
    var cartoona =``;
    for(var i=0;i<productsContainer.length;i++)
    {
        cartoona+= `<tr>
        
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>


        </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cartoona;
}

//6
function deleteProduct (index) {
  productsContainer.splice(index,1);
  localStorage.setItem('ourProducts' , JSON.stringify( productsContainer));
  displayProducts ();
}



//7
function searchProduct (term) {

  var cartoona=``;

  for(var i=0;i<productsContainer.length;i++)
  {
    if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true)
    {
      cartoona+= `<tr>
        
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>


        </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = cartoona;
}



//8
function updateProduct (index) {

  currentIndex = index;

  productNameInput.value = productsContainer[index].name;
  productPriceInput.value = productsContainer[index].price;
  productCategoryInput.value = productsContainer[index].category;
  productDescInput.value = productsContainer[index].desc;

  // document.getElementById('mainBtn').innerHTML='Update';
  addBtn.innerHTML = 'Update';

}
//8
function saveUpdate () {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  //8 bdl ====>> //2
  productsContainer[currentIndex]= product;
  
  localStorage.setItem('ourProducts' , JSON.stringify( productsContainer));//5

  // console.log(productsContainer);
  displayProducts ();
  clearForm();

  addBtn.innerHTML = 'Add Product';
}
//8
addBtn.addEventListener('click',function(){
  if(addBtn.innerHTML == 'Add Product')
  {
    addProduct();
  }
  else
  {
    saveUpdate();
  }
})



//9
function validateProductName () {

  var regex = /^[A-Z][a-z]{2,9}$/;

  if(regex.test(productNameInput.value)==true)
  {
    return true;
  }
  else
  {
    return false;
  }
}