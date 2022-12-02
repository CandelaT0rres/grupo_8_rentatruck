window.addEventListener('load', function() {
    let rol = document.querySelector('#id_rol');
    let licencia = document.querySelector('.licencia');
    let inputLicencia = document.querySelector('#licencia');
    let errorLicencia = document.querySelector('#licenciaH5');
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
            errorLicencia.innerText = 'Debes completar este campo'
        } else {
            errorLicencia.classList.add('none')
        }
})
})