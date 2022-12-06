window.addEventListener('load', function() {
    let rol = document.querySelector('#id_rol');
    let licencia = document.querySelector('.licencia');
    let inputLicencia = document.querySelector('#licencia');
    let errorLicencia = document.querySelector('#licenciaH5');
    let inputNombre = document.querySelector('#nombre');
    let errorNombre = document.querySelector('#errorNombre');
    let inputDireccion = document.querySelector('#direccion');
    let errorDireccion = document.querySelector('#errorDireccion');
    let inputApellido = document.querySelector('#apellido');
    let errorApellido = document.querySelector('#errorApellido');
    let inputTelefono = document.querySelector('#telefono');
    let errorTelefono = document.querySelector('#errorTelefono');
    let inputDni = document.querySelector('#dni');
    let errorDni = document.querySelector('#errorDni');
    const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let inputEmail = document.querySelector('#email');
    let errorEmail = document.querySelector('#errorEmail');
    let inputPass = document.querySelector('#password');
    let errorPass = document.querySelector('#errorPassword');
    let inputPass2 = document.querySelector('#password2');
    let errorPass2 = document.querySelector('#errorPassword2');
    let img = document.querySelector('#img');
    let errorImg = document.querySelector('#errorImg');
    let formularioRegistro = document.querySelector('#formulario-registro');
    console.log(img.value);
    rol.addEventListener('change', function() {
        if (rol.value == 3) {
            if (licencia.classList.contains('none')) {
                licencia.classList.remove('none')
            }
        } else {
            licencia.classList.add('none')
        }
    })

    inputNombre.addEventListener('change', function() {
        if (inputNombre.value.length == 0) {
            errorNombre.classList.remove('none');
            inputNombre.classList.add('is-invalid');
            errorNombre.classList.add('text-danger');
            errorNombre.innerText = 'Debes ingresar un nombre';
        } else if (inputNombre.value.length < 6) {
            errorNombre.classList.remove('none');
            inputNombre.classList.add('is-invalid');
            errorNombre.classList.add('text-danger');
            errorNombre.innerText = 'Debes ingresar 6 caracteres como mínimo.';
        } else {
            errorNombre.classList.add('none');
            inputNombre.classList.remove('is-invalid');
            inputNombre.classList.add('is-valid');
        }
    });

    inputDireccion.addEventListener('change', function() {
        if (inputDireccion.value.length == 0) {
            errorDireccion.classList.remove('none');
            inputDireccion.classList.add('is-invalid');
            errorDireccion.classList.add('text-danger');
            errorDireccion.innerText = 'Debes ingresar una dirección';
        } else if (inputDireccion.value.length < 6) {
            errorDireccion.classList.remove('none');
            inputDireccion.classList.add('is-invalid');
            errorDireccion.classList.add('text-danger');
            errorDireccion.innerText = 'Debe tener 6 caracteres como mínimo';
        } else {
            errorDireccion.classList.add('none');
            inputDireccion.classList.remove('is-invalid');
            inputDireccion.classList.add('is-valid');
        }
    });

    inputApellido.addEventListener('change', function() {
        if (inputApellido.value.length == 0) {
            errorApellido.classList.remove('none');
            inputApellido.classList.add('is-invalid');
            errorApellido.classList.add('text-danger');
            errorApellido.innerText = 'Debes ingresar un apellido'
        } else if (inputApellido.value.length < 6) {
            errorApellido.classList.remove('none');
            inputApellido.classList.add('is-invalid');
            errorApellido.classList.add('text-danger');
            errorApellido.innerText = 'Debe tener 6 caracteres como mínimo';
        } else {
            errorApellido.classList.add('none');
            inputApellido.classList.remove('is-invalid');
            inputApellido.classList.add('is-valid');
        };
    });

    inputTelefono.addEventListener('change', function() {
        if (inputTelefono.value.length == 0) {
            errorTelefono.classList.remove('none');
            inputTelefono.classList.add('is-invalid');
            errorTelefono.classList.add('text-danger');
            errorTelefono.innerText = 'Debes completar el campo Teléfono';
        } else if (inputTelefono.value.length < 6) {
            errorTelefono.classList.remove('none');
            inputTelefono.classList.add('is-invalid');
            errorTelefono.classList.add('text-danger');
            errorTelefono.innerText = 'Debe tener 6 campos como mínimo';
        } else {
            errorTelefono.classList.add('none');
            inputTelefono.classList.remove('is-invalid');
            inputTelefono.classList.add('is-valid');
        };
    });

    inputDni.addEventListener('change', function() {
        if (inputDni.value.length == 0) {
            errorDni.classList.remove('none');
            errorDni.classList.add('text-danger');
            errorDni.innerText = 'Debes ingresar un Número de documento';
            inputDni.classList.add('is-invalid');
        } else if (inputDni.value.length < 6) {
            errorDni.classList.remove('none');
            errorDni.classList.add('text-danger');
            errorDni.innerText = 'Debe tener al menos 6 caracteres';
            inputDni.classList.add('is-invalid');
        } else {
            errorDni.classList.add('none');
            inputDni.classList.remove('is-invalid');
            inputDni.classList.add('is-valid');
        };
    });

    inputEmail.addEventListener('change', function() {
        let esValido = expReg.test(inputEmail.value);
        if (inputEmail.value.length == 0) {
            errorEmail.classList.remove('none');
            errorEmail.classList.add('text-danger');
            errorEmail.innerText = 'Debes ingresar un correo electrónico';
            inputEmail.classList.add('is-invalid');
        } else if (esValido == false) {
            errorEmail.classList.remove('none');
            errorEmail.classList.add('text-danger');
            errorEmail.innerText = 'El correo electrónico no es válido';
            inputEmail.classList.add('is-invalid');
        } else {
            errorEmail.classList.add('none');
            inputEmail.classList.remove('is-invalid');
            inputEmail.classList.add('is-valid');
        };
    });

    inputLicencia.addEventListener('change', function(e) {
        if (inputLicencia.value.length < 1) {
            errorLicencia.classList.remove('none');
            errorLicencia.classList.add('text-danger');
            inputLicencia.classList.add('is-invalid');
            errorLicencia.innerText = 'Debes completar este campo';
        } else if (inputLicencia.value.length < 6) {
            errorLicencia.classList.remove('none');
            errorLicencia.classList.add('text-danger');
            inputLicencia.classList.add('is-invalid');
            errorLicencia.innerText = 'Debe tener 6 caracteres como mínimo';
        } else {
            errorLicencia.classList.add('none');
            inputLicencia.classList.remove('is-invalid');
            inputLicencia.classList.add('is-valid');
        };
    });

    inputPass.addEventListener('change', function() {
        if (inputPass.value.length == 0) {
            errorPass.classList.remove('none');
            errorPass.classList.add('text-danger');
            errorPass.innerText = 'Debes ingresar una contraseña';
            inputPass.classList.add('is-invalid');
        } else if (inputPass.value.length < 6) {
            errorPass.classList.remove('none');
            errorPass.classList.add('text-danger');
            errorPass.innerText = 'Debe tener 6 caracteres como mínimo';
            inputPass.classList.add('is-invalid');
        } else {
            errorPass.classList.add('none');
            inputPass.classList.remove('is-invalid');
            inputPass.classList.add('is-valid');
        };
    });

    inputPass2.addEventListener('change', function() {
        if (inputPass2.value.length == 0) {
            errorPass2.classList.remove('none');
            errorPass2.classList.add('text-danger');
            errorPass2.innerText = 'Debes ingresar una contraseña';
            inputPass2.classList.add('is-invalid');
        } else if (inputPass2.value.length < 6) {
            errorPass2.classList.remove('none');
            errorPass2.classList.add('text-danger');
            errorPass2.innerText = 'Debe tener 6 caracteres como mínimo';
            inputPass2.classList.add('is-invalid');
        } else {
            errorPass2.classList.add('none');
            inputPass2.classList.remove('is-invalid');
            inputPass2.classList.add('is-valid');
            if (inputPass.value.length >= 6) {
                if (inputPass.value != inputPass2.value) {
                    errorPass2.classList.remove('none');
                    errorPass2.classList.add('text-danger');
                    errorPass2.innerText = 'Las contraseñas no coinciden';
                    inputPass2.classList.add('is-invalid');
                    inputPass.classList.add('is-invalid');
                } else {
                    inputPass.classList.remove('is-invalid');
                    inputPass.classList.add('is-valid');
                }
            }
        };
    });

    img.addEventListener('change', function() {
        let filePath = img.value;
        let extencionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
        if (!extencionesPermitidas.exec(filePath)) {
            errorImg.classList.remove('none');
            errorImg.classList.add('text-danger');
            errorImg.innerText = 'El formato de imágen no es válido';
            img.classList.add('is-invalid');
        } else {
            errorImg.classList.add('none');
            img.classList.remove('is-invalid');
            img.classList.add('is-valid');
        }
    })

})