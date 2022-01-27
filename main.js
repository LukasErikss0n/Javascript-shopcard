let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Tag heuar watch ',
        tag: 'tadeusz-lakota-Tb38UzCvKCY-unsplash',
        price: 2000,
        inCart: 0
    },
    {
        name: 'Fossil watch',
        tag: 'fossilwatch',
        price: 1000,
        inCart: 0
    },
    {
        name: 'Rolex submarin date',
        tag: 'rolex',
        price: 7000,
        inCart: 0
    },
    {
        name: 'Gucci shoes',
        tag: 'max-anderson-gmxTzER0ih8-unsplash',
        price: 500,
        inCart: 0
    }
]

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNummbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNummbers(){
    let productNummbers = localStorage.getItem('cartNummbers')

    if(productNummbers){
    document.querySelector('.cart span').textContent = productNummbers;
    }
}

function cartNummbers(products){
    let productNummbers = localStorage.getItem('cartNummbers')
    
    productNummbers = parseInt(productNummbers);

    if(productNummbers){
        localStorage.setItem('cartNummbers', productNummbers +1);
        document.querySelector('.cart span').textContent = productNummbers +1;
    } else{
        localStorage.setItem('cartNummbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

   setItems(products)

}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);

    if(cartItems !== null){
        if(cartItems[products.tag] == undefined){
            cartItems ={
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify
    (cartItems));
}

function totalCost(products){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + 
        products.price);
    } else{
        localStorage.setItem('totalCost', products.price);
    }  
}

function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    ('.products');
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
                <i class=" cross fas fa-times"></i>
                <img src="./img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class ="price">$${item.price},00</div>
            <div class ="quantity">
                <i class="fas fa-arrow-circle-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-arrow-circle-right"></i>
            </div>
            <div class ="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHtml += `
            <div class ="basketTotalContainer">
                <h4 class="basketTotalTitle">
                Basket Total
                </h4>
                <h4 class ="basketTotal">
                $${cartCost},00
                </h4>
        `;
    }
}

onLoadCartNummbers()
displayCart()
