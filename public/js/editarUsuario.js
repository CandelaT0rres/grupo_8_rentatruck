window.addEventListener('load', () => {
    let formEdit = document.querySelector('.fondo-registro');
    let inputs = document.querySelectorAll('.fondo-registro input');
    let errores = document.querySelectorAll('.fondo-registro h5');

    const validaciones = {
        vacioLongitud: (input, error) => {
            if (input.value.length == 0) {
                input.classList.add('is-invalid');
                error.classList.remove('d-none');
                error.classList.add('text-danger');
                error.innerText = 'Debes completar este campo';
            } else if (input.value.length < 6) {
                input.classList.add('is-invalid');
                error.classList.remove('d-none');
                error.classList.add('text-danger');
                error.innerText = 'Debe tener 6 caracteres como mínimo';
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
                error.classList.add('d-none');
            }
        }
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            validaciones.vacioLongitud(inputs[i], errores[i]);
        })
    }

})