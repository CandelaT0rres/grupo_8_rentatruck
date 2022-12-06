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
    let formularioRegistro = document.querySelector('#formulario-registro');
    let boton = document.querySelector('.btn-home-inicio-sesion');

    rol.addEventListener('change', function() {
        if (rol.value == 3) {
            if (licencia.classList.contains('none')) {
                licencia.classList.remove('none')
            }
        } else {
            licencia.classList.add('none')
        }
    })

    inputNombre.addEventListener('focusout', function() {
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

    inputDireccion.addEventListener('focusout', function() {
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

    inputApellido.addEventListener('focusout', function() {
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

    inputTelefono.addEventListener('focusout', function() {
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

    inputLicencia.addEventListener('focusout', function(e) {
        if (inputLicencia.value.length < 1) {
            errorLicencia.classList.remove('none');
            errorLicencia.classList.add('text-danger');
            inputLicencia.classList.add('is-invalid');
            errorLicencia.innerText = 'Debes completar este campo'
        } else if (inputLicencia.value.length < 6) {
            errorLicencia.classList.remove('none');
            errorLicencia.classList.add('text-danger');
            inputLicencia.classList.add('is-invalid');
            errorLicencia.innerText = 'Debe tener 6 caracteres como mínimo'
        } else {
            errorLicencia.classList.add('none')
            inputLicencia.classList.remove('is-invalid');
            inputLicencia.classList.add('is-valid')
        }
    })
})