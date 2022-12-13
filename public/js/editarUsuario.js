window.addEventListener('load', () => {
    let formEdit = document.querySelector('.fondo-registro');
    let inputs = document.querySelectorAll('.fondo-registro input');
    let errores = document.querySelectorAll('.fondo-registro h5');

    let errors = [];

    const validaciones = {
        vacioLongitud: (input, error) => {
            if (input.type == 'file') {
                let filePath = input.value;
                let extencionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
                if (!extencionesPermitidas.exec(filePath)) {
                    input.classList.add('is-invalid');
                    error.classList.remove('d-none');
                    error.classList.add('text-danger');
                    error.innerText = 'No es un formato de imágen válido';
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                    error.classList.add('d-none');
                }
            } else {
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
        },
        paraForm: (input) => {
            if (input.type == 'file') {
                let filePath = input.value;
                let extencionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
                if (!extencionesPermitidas.exec(filePath)) {
                    errors.push(1);
                } else {
                    errors.push(0);
                }
            } else {
                if (input.value.length == 0) {
                    errors.push(1);
                } else if (input.value.length < 6) {
                    errors.push(1);
                } else {
                    errors.push(0);
                };
            }
        }
    };
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            validaciones.vacioLongitud(inputs[i], errores[i]);
        })
    }
    
    formEdit.addEventListener('submit', (e) => {
        for (let i = 0; i < inputs.length; i++) {
            validaciones.paraForm(inputs[i]);
        };
        if (errors.includes(1)) {
            e.preventDefault();
            alert('Debes completar todos los campos correctamente para continuar');
        }
        errors = [];
    })
})