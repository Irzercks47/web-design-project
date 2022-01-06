var form = document.getElementById('form')
var nama = document.getElementById('name')
var email = document.getElementById('email')
var address = document.getElementById('address')
var agree = document.getElementById('agree')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    isValid()
})

function checkInput() {
    var namaVal = nama.value.trim()
    var emailVal = email.value.trim()
    var addressVal = address.value.trim()

    if(namaVal === '') {   
        setError(nama, "Nama tidak boleh kosong")
        return false
    }else if(namaVal.length < 4 ){
        setError(nama, "Nama tidak boleh kurang dari 4 huruf")
        return false
    }else{
        setSuccess(nama)
    }

    if(emailVal === ''){
        setError(email, "Email tidak boleh kosong")
        return false
    }else if(!isEmail(emailVal)){
        setError(email, "Email tidak valid")
        return false
    }else{
        setSuccess(email)
    }

    if(addressVal === '') {   
        setError(address, "Alamat tidak boleh kosong")
        return false
    }else if(addressVal.length < 6 ){
        setError(address, "Alamat tidak boleh kurang dari 6 huruf")
        return false
    }else{
        setSuccess(address)
    }
    return true
}

function setError(input, message) {
    var formGroup = input.parentElement
    var small = formGroup.querySelector('small')

    small.innerText = message

    formGroup.className = 'form-group error'
}

function setSuccess(input) {
    var formGroup = input.parentElement
    formGroup.className = 'form-group success'
}

function isEmail(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function isValid() {
    checkInput()

    if(checkInput() == true) {
        clearProd()
        window.location.href = "home.html"
    }else{
        return false
    }
}