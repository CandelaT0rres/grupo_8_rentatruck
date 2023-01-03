window.addEventListener('load', function() {
    let form = document.querySelector('#formulario-registro');
    let inputs = document.querySelectorAll('#formulario-registro .input');
    let inputLicencia = document.querySelector('.inputLicencia');
    let tipoUsuario = document.querySelector('.tipoUsuario')
    let errores = document.querySelectorAll('#formulario-registro p');
    let errorLicencia = document.querySelector('#errorLicencia');
    let divLicencia = document.querySelector('.licencia');
    let extencionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
    const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    let errors = [];

    const validaciones = {
        vacioLongitud: (input, error) => {
            if (input.type == 'file') {
                let filePath = input.value;
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
            } else if (input.type == 'email') {
                let esValido = expReg.test(input.value);
                if (input.value.length == 0) {
                    input.classList.add('is-invalid');
                    error.classList.remove('d-none');
                    error.classList.add('text-danger');
                    error.innerText = 'Debes completar este campo';
                } else if (esValido == false) {
                    input.classList.add('is-invalid');
                    error.classList.remove('d-none');
                    error.classList.add('text-danger');
                    error.innerText = 'Debe ingresar un formato de E-Mail válido';
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                    error.classList.add('d-none');
                }
            } else if (input.type != 'select-one') {
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
                if (!extencionesPermitidas.exec(filePath)) {
                    errors.push(1);
                } else {
                    errors.push(0);
                }
            } else if (input.type == 'email') {
                let esValido = expReg.test(input.value);
                if (input.value.length == 0) {
                    errors.push(1);
                } else if (esValido == false) {
                    errors.push(1);
                } else {
                    errors.push(0);
                }
            } else if (input.type == 'select-one') {
                errors.push(0);
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

    tipoUsuario.addEventListener('change', () => {
        if (tipoUsuario.value == 3) {
            divLicencia.classList.remove('none');
            inputLicencia.addEventListener('change', () => {
                validaciones.vacioLongitud(inputLicencia, errorLicencia)
            })
        } else {
            divLicencia.classList.add('none');
        };
    });

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            validaciones.vacioLongitud(inputs[i], errores[i])
        });
    }

    form.addEventListener('submit', (e) => {
        for (let i = 0; i < inputs.length; i++) {
            validaciones.paraForm(inputs[i]);
            if (inputs[i].type == 'select-one' && inputs[i].value == 3) {
                validaciones.paraForm(inputLicencia);
            }
        };
        if (errors.includes(1)) {
            e.preventDefault();
            document.getElementById('divError').classList.remove('invisible')
            document.getElementById('divError').classList.add('visible')
        }
        errors = [];
    })
})