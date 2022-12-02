window.addEventListener('load', function() {
    let rol = document.querySelector('#id_rol');
    let licencia = document.querySelector('.licencia');
    let inputLicencia = document.querySelector('#licencia');
    let errorLicencia = document.querySelector('#licenciaH5');
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