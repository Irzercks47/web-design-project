var cart = document.querySelectorAll('.ord')

var products = [
    {
        nama : "Burger Double",
        price :  40000,
        inCart :  0,
        foto : "fav1"
    },

    {
        nama : "Paket Burger",
        price :  68000,
        inCart :  0,
        foto : "fav2"
    },

    {
        nama : "Burger Dengan Telur",
        price :  35000,
        inCart :  0,
        foto : "fav3"
    },

    {
        nama : "Burger Combo",
        price :  40000,
        inCart :  0,
        foto : "fav4"
    },

    {
        nama : "Paket Deluxe",
        price :  68000,
        inCart :  0,
        foto : "fav5"
    },

    {
        nama : "Paket Whooper",
        price :  35000,
        inCart :  0,
        foto : "fav6"
    },
]

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click',() =>{
        cartNumb(products[i])
        totalCost(products[i])
    })
}

function cartNumb(product, action) {
    let prodNumb = localStorage.getItem('cartNumb')
    prodNumb = parseInt(prodNumb)
    let cartItem = localStorage.getItem('productInCart');
    cartItem = JSON.parse(cartItem);
    if (action) {
        localStorage.setItem("cartNumb", prodNumb - 1)
        document.querySelector('.nav-item span').textContent = prodNumb - 1
    }
    else if (prodNumb) {
        localStorage.setItem('cartNumb', prodNumb + 1)
        document.querySelector('.nav-item span').textContent = prodNumb + 1
    }
    else{
        localStorage.setItem('cartNumb', 1)
        document.querySelector('.nav-item span').textContent = 1
    }

    setItem(product)
}

function onLoadCartNumb() {
    let prodNumb = localStorage.getItem('cartNumb')

    if(prodNumb){
        document.querySelector('.nav-item span').textContent = prodNumb
    }
}

function setItem(product){
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)
    console.log(cartItem)

    if(cartItem != null) {
        if(cartItem[product.nama] == undefined) {
            cartItem = {
                ...cartItem,
                [product.nama]: product
            }
        }
        cartItem[product.nama].inCart += 1
    }else{
        product.inCart = 1
        cartItem = {
            [product.nama]: product
        }
    }
    localStorage.setItem("productInCart", JSON.stringify(cartItem))
}

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost')
    if(action){
        cart = parseInt(cartCost)

        localStorage.setItem("totalCost", cart - product.price)
    }
    else if(cartCost != null) {
        cart = parseInt(cartCost)
        localStorage.setItem("totalCost", cart + product.price)
    }else{
        localStorage.setItem("totalCost", product.price)
    }

}

//display
function displayCart() {
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)
    var productContainer = document.querySelector(".product-container")
    if (cartItem && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItem).map(item => {
            productContainer.innerHTML += `
            <tr>
                <td colspan="3" scope="col" class="item">
                    <button type="button" class="btn btn-secondary remove">X</button>
                    <img src="Asset/${item.foto}.png" class="img-prod">
                    <span>${item.nama}</span>
                </td>   
                <td scope="col" class="quantity">
                    <button type="button" class="btn btn-danger min-ord">-</button>
                    <span class="it">${item.inCart}</span>
                    <button type="button" class="btn btn-success plus-ord">+</button>
                </td>
                <td scope="col" class="price">
                    <span>Rp. ${item.inCart * item.price}</span>
                </td>
            </tr>
            `
            document.querySelector('.total').textContent = 'Rp.' + ' ' + localStorage.getItem('totalCost')

            deleteProd()
            manageProd()
        })
    }
}

function manageProd() {
    var incButt = document.querySelectorAll('.plus-ord')
    var decButt = document.querySelectorAll('.min-ord')
    let currQty = 0
    let currProd = ''
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)
    for(let i = 0; i < incButt.length; i++) {
        incButt[i].addEventListener('click',() => {
            currQty = incButt[i].parentElement.querySelector('span').textContent
            console.log(currQty)
            currProd = incButt[i].parentElement.previousElementSibling.querySelector('span').textContent;
            console.log(currProd)

            
            cartItem[currProd].inCart += 1
            cartNumb(cartItem[currProd])
            totalCost(cartItem[currProd])
            localStorage.setItem('productInCart',JSON.stringify(cartItem))
            displayCart()
        })

        
        decButt[i].addEventListener('click',() => {
            currQty = decButt[i].parentElement.querySelector('span').textContent
            console.log(currQty)
            currProd = decButt[i].parentElement.previousElementSibling.querySelector('span').textContent;
            console.log(currProd)

            if(cartItem[currProd].inCart > 1){
                cartItem[currProd].inCart -= 1
                cartNumb(cartItem[currProd],"decrease")
                totalCost(cartItem[currProd], "decrease")
                localStorage.setItem('productInCart',JSON.stringify(cartItem))
                displayCart()
            }
        })
    }
}

function deleteProd() {
    let delButt = document.querySelectorAll('.item button')
    let prodNumb = localStorage.getItem('cartNumb')
    let cartCost = localStorage.getItem("totalCost")
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)
    let prodName

    console.log(delButt)
    for(let i = 0; i < delButt.length ; i++){
        delButt[i].addEventListener('click', () => {
            prodName = delButt[i].parentElement.querySelector('span').textContent
            console.log(prodName)
            localStorage.setItem('cartNumb', prodNumb - cartItem[prodName].inCart)
            localStorage.setItem('totalCost', cartCost - ( cartItem[prodName].price * cartItem[prodName].inCart));

            delete cartItem[prodName];
            localStorage.setItem('productInCart', JSON.stringify(cartItem));

            displayCart()
            onLoadCartNumb()
        })
    }
}

function clearProd() {
    localStorage.clear()
}


onLoadCartNumb()
displayCart()
