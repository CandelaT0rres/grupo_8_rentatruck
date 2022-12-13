window.addEventListener("load", ()=>{
    let formLogin = document.querySelector("#form-login");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let msgErrorEmail = document.querySelector("#msgErrorEmail");
    let msgErrorPassword = document.querySelector("#msgErrorPassword");
    
    
    const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    email.addEventListener("keyup", ()=>{
        let emailValido = expReg.test(email.value);
        if(email.value.length == 0){
            msgErrorEmail.classList.remove("d-none")
            email.classList.add("is-invalid");
            msgErrorEmail.classList.add("text-danger");
            msgErrorEmail.innerText="Debes ingresar un Email"
        }else if(emailValido == false){
            msgErrorEmail.classList.remove("d-none")
            email.classList.add("is-invalid");
            msgErrorEmail.classList.add("text-danger");
            msgErrorEmail.innerText="El formato de Email no es valido";
        }
        else{
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            msgErrorEmail.classList.add("d-none");
        }
    })
    password.addEventListener("keyup", ()=>{
        if(password.value.length == 0){
            msgErrorPassword.classList.remove("d-none");
            password.classList.add("is-invalid");
            msgErrorPassword.classList.add("text-danger");
            msgErrorPassword.innerText="Debes ingresar una contraseña"
        } else {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
            msgErrorPassword.classList.add("d-none");
        }
    })
    formLogin.addEventListener("submit", (event)=>{
        if(password.value.length == 0 || email.value.length == 0 ){
            event.preventDefault()
        }
    })
})