//Capturo el formulario por ID
const formulario = document.getElementById('formulario');
//Capturo todos los imputs (selectorAll devuelve un array)
const inputs = document.querySelectorAll('.form-control');
//Expresiones para validar
let expresiones = {	
    patente: /^[a-zA-Z0-9]{4,8}$/, // Letras, numeros
    modelo: /^[a-zA-Z0-9\-]{1,20}$/, // Letras, numeros, guion
    km: /^\d{1,10}$/, // 1 a 10 numeros.
    precio_km: /^\d{1,100000}$/
};
//Creo un objeto de los campos en false, si se cumplen las validaciones los paso a true.
const campos = {
    marcas: false,
    modelo: false,
    patente: false,
    km: false,
    precio_km: false,
    ruta_img: false,
    tipo_mercaderia: false
};
//Valido que se cumplan las expresiones y que el campo no este vacío
//Puse un span vacío - 'nextElementSibling' lo uso para indicar que es el elemento hermano que le sigue (el span) dentro del mismo padre.
const validandoExpresiones = (expresiones, input, name, mensaje) => {
    if (expresiones.test(input.value) && input.value.length != 0) {
        document.getElementById(name).classList.remove('is-invalid');
        document.getElementById(name).classList.add('is-valid');
        input.nextElementSibling.innerText = ''; 
        campos[name] = true;
    } else {
        document.getElementById(name).classList.remove('is-valid');
        document.getElementById(name).classList.add('is-invalid');
        input.nextElementSibling.classList.add('text-danger'); // --> al span vacío le agrego la clase y el texto de error.
        input.nextElementSibling.innerText = mensaje; 
        campos[name] = false;
    };
};
const validandoImg = (input, id) => {
     //e.target.files obtengo un array de los archivos --> [0] porque es 1 solo. 
    //.name me da un string, lo divido con split donde haya un '.' y el resultado es un array
    let extensionImg = input.files[0].name.split('.').pop().toLowerCase();
    let extensiones = ['jpg', 'png', 'gif', 'jpeg'];
    if (extensiones.includes(extensionImg)) {
        document.getElementById(id).classList.add('is-valid');
        document.getElementById(id).classList.remove('is-invalid');
        input.nextElementSibling.innerText = '';
        campos[id] = true;
    }else{
        document.getElementById(id).classList.add('is-invalid');
        document.getElementById(id).classList.remove('is-valid');
        input.nextElementSibling.innerText = 'Debes cargar una imagen, las extenciones permitidas son: .jpg, .png, .gif, .jpeg';
        input.nextElementSibling.classList.add('text-danger');
        campos[id] = false;
    }
};
//Valido que se haya alguna opcion seleccionada
const validandoSelects = (input, name, mensaje) => {
    if (input.value.length != 0) {
        document.getElementById(name).classList.remove('is-invalid');
        document.getElementById(name).classList.add('is-valid');
        input.nextElementSibling.innerText = ''; 
        campos[name] = true;
    } else {
        document.getElementById(name).classList.add('is-invalid');
        document.getElementById(name).classList.remove('is-valid');
        input.nextElementSibling.innerText = mensaje;
        input.nextElementSibling.classList.add('text-danger'); 
        campos[name] = false;
    };
};

//Creo una funsión que dentro hace un switch según el e.target.name (name del input), segun el case, aplica uno u otro código.
const validarCampos = (e) => {
    switch (e.target.name) {
        case 'marcas':
            validandoSelects(e.target, e.target.name, 'Seleccione una marca por favor');
            break;
        case 'modelo':
            validandoExpresiones(expresiones.modelo, e.target, e.target.name, 'Ingrese el modelo, puede contener letras, numeros y guion, máximo 20 dígitos');
            break;
        case 'patente':
            validandoExpresiones(expresiones.patente, e.target, e.target.name, 'Ingrese una patente, puede contener letras y numeros sin espacios, máximo 8 dígitos');
            break;
        case 'km':
            validandoExpresiones(expresiones.km, e.target, e.target.name, 'Debe ingresar el kilometraje, el mismo debe ser un valor numérico menor a 10 dígitos');
            break;
        case 'precio_km':
            validandoExpresiones(expresiones.precio_km, e.target, e.target.name, 'Ingrese el precio/km, el mismo debe ser un valor numérico');
            break;
        case 'ruta_img':
            validandoImg(e.target, e.target.name);
            break;
        case 'tipo_mercaderia':
            validandoSelects(e.target, e.target.name, 'Seleccione una categoria por favor');
            break;
    };
};
//Con un forEach recorro los inputs y ejecuto 3 eventos. 
//keyup(para que el error aparezca mientras se escribe)
//blur para que una vez que se salga del input si hay errores se mantengan
//change para validar los select y el input file.
inputs.forEach((input) => {
    input.addEventListener("keyup", validarCampos);
    input.addEventListener("blur", validarCampos);
    input.addEventListener("change", validarCampos);
});
formulario.addEventListener("submit", (e) => {
    console.log(campos);
    e.preventDefault()
    if (campos.km && campos.marcas && campos.modelo && campos.patente && campos.precio_km && campos.ruta_img && campos.tipo_mercaderia) {
        formulario.submit();
    } else {
        document.getElementById('divError').classList.remove('invisible')
        document.getElementById('divError').classList.add('visible')
    }
});
