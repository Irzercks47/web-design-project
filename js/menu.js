var cart = document.querySelectorAll('.ord')

//buat array product yang didalamnya ada obj
//funsginya untuk track product yang di pesan
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

/*Event listener*/
// jadi dia akan loop semua objectnya agar tidak apply satu"
for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click',() =>{
        cartNumb(products[i])
        totalCost(products[i])
    })
}

//menggunakan fungsi ini agar bila pindah atau refresh halaman value nya masih ada
//caranya adalah menyimpannya di local storage 
//cara melihat inspect pilih aplikasi buka local storage
function cartNumb(product, action) {
    // //untuk cek produk yang masuk
    // console.log("product is ", product)
    //akan mengambil value ketika dipencet
    let prodNumb = localStorage.getItem('cartNumb')
    // //untuk print prodnumb 
    // console.log(prodNumb)
    // //untuk mengetahui jenis data yang dimana disini adalah jenisnya string
    // //maka kita convert ke int
    // console.log(typeof prodNumb)

    //convert jenis data ke int
    prodNumb = parseInt(prodNumb)
    // console.log(typeof prodNumb)
    // //ketika kita pencet pertamakali karena tidak ada datanya maka akan NaN
    // //untuk menghindarinya kita bisa menggunakan if 
    // console.log(prodNumb)
    let cartItem = localStorage.getItem('productInCart');
    cartItem = JSON.parse(cartItem);
    if (action) {
        localStorage.setItem("cartNumb", prodNumb - 1)
        document.querySelector('.nav-item span').textContent = prodNumb - 1
    }
    //ketika ada prodNumb atau kita menambahkan product kita akan melakukan 
    else if (prodNumb) {
        //disini prodNumb akan bertambah 1 bila menambah product
        localStorage.setItem('cartNumb', prodNumb + 1)
        document.querySelector('.nav-item span').textContent = prodNumb + 1
    }
    //ketika tidak ada produk maka akan di set 1
    else{
        localStorage.setItem('cartNumb', 1)
        document.querySelector('.nav-item span').textContent = 1
    }

    setItem(product)
}

//order bila di refresh halaman akan hilang
//namun valuenya masih tersimpan di local storage maka fungsi ini dibutuhkan
//fungsi ini tidak akan di run bila tidak dipanggil
function onLoadCartNumb() {
    //kita akan mengambil lagi value dari local yang tersimpan di cartNumb ketika ada
    let prodNumb = localStorage.getItem('cartNumb')

    //ketika ada prodNumb maka akan mengambil value tersebut
    if(prodNumb){
        document.querySelector('.nav-item span').textContent = prodNumb
    }
}

function setItem(product){
    ////cek apakah masuk
    // console.log("setItem")
    // console.log("product is ", product)

    //akan mengambil productInCart di local storage
    let cartItem = localStorage.getItem('productInCart')
    //yang didapat adalah json ketika passing data maka harus diubah ke obj javascript 
    cartItem = JSON.parse(cartItem)
    //cek cartItem
    console.log(cartItem)

    //ketika sudah ada maka akan ditambah 1
    if(cartItem != null) {
        // //akan cek cartItem[product.nama] yang dimana akan error karena berbeda dengan obj pertama maka akan undefined
        // console.log(cartItem[product.nama])
        //untuk mengatasi error karena beda obj maka menggunakan if ini bila product.nama sama undefined
        if(cartItem[product.nama] == undefined) {
            //akan update cartItem
            cartItem = {
                //dengan cara grab item sebelumnya dan kemudian akan dimasukkan obj baru
                //maka incart obj baru akan bertambah 1
                ...cartItem,
                [product.nama]: product
            }
        }
        cartItem[product.nama].inCart += 1
    //bila tidak ada akan di set 1 bila di klik
    }else{
        //ketika pertama kali di klik akan 1 inCartnya
        product.inCart = 1
        cartItem = {
            [product.nama]: product
        }
    }
    //object harus di passing sebagai json bukan sebagai obj javascript
    localStorage.setItem("productInCart", JSON.stringify(cartItem))
}

//akan menghitung totprice
function totalCost(product, action) {
    // //untuk memastikan apakah sudah benar grabnya
    // console.log("price is", product.price)
    //akan mengambil totalCost dari local
    let cartCost = localStorage.getItem('totalCost')
    // //debug
    // console.log(cartCost)
    // console.log(typeof cartCost)

    if(action){
        cart = parseInt(cartCost)

        localStorage.setItem("totalCost", cart - product.price)
    }
    //untuk cek apakah totcost nya sudah ada atau belum
    //bila cartCost tidak sama dengan null maka
    else if(cartCost != null) {
        //karena tipe data string maka harus diubah menjadi int dulu
        cart = parseInt(cartCost)
        //set totCost dengan hasil dari cartCost + product.price
        localStorage.setItem("totalCost", cart + product.price)
    }else{
        //akan membuat variabel baru di local storage yang bernama totalCost
        localStorage.setItem("totalCost", product.price)
    }

}

//display
function displayCart() {
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)

    // //cek apakah sudah bisa dibaca
    // console.log(cartItem)

    var productContainer = document.querySelector(".product-container")
    //untuk cek apakah ada cartItem dan di halaman tersebut ada productContainer
    //agar fungsi ini dapat berjalan
    if (cartItem && productContainer) {
        // //cek
        // console.log('Running')
        //html nya akan dikosongkan terlebih dahulu
        productContainer.innerHTML = ''
        //kemudian bila ada cartItem akan di loop
        Object.values(cartItem).map(item => {
            //agar tidak ke override maka menggunakan +=
            //`` = untuk menambhakan element HTML
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

//manage product
function manageProd() {
    //grab class plus-ord dan min-ord yang akan di assign ke incButt dan decButt
    var incButt = document.querySelectorAll('.plus-ord')
    var decButt = document.querySelectorAll('.min-ord')
    let currQty = 0
    let currProd = ''
    let cartItem = localStorage.getItem('productInCart')
    cartItem = JSON.parse(cartItem)

    //assign event listener menggunakan bebas bisa menggunakan incButt atau decButt karena jumlah nya pasti sama
    for(let i = 0; i < incButt.length; i++) {
        incButt[i].addEventListener('click',() => {
            // jadi qty sekarang diambil dari span yang ada di parent
            currQty = incButt[i].parentElement.querySelector('span').textContent
            console.log(currQty)
            //mengambil nama produk
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


//ketika page di load ini akan di run saat page sudah di load
onLoadCartNumb()
displayCart()
