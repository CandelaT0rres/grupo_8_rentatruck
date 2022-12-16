window.addEventListener("load", () => {

    function vaciarCarrito() {
        localStorage.removeItem('carrito');
    };


    function precioTotal(productos) {
        return productos.reduce((acum, producto) =>  (acum += producto.precio * producto.cantidad),0);
    };

    let productos = [];
    let cuerpoCarrito = document.querySelector('.cuerpoCarrito');

    //Completar el carrito con la data de localStorage.
    if (localStorage.carrito) {

        //En local storage solamente tengo el ID del producto y la cantidad - el resto lo obtengo desde la db haciendo un fetch
        let carrito = JSON.parse(localStorage.carrito);
        carrito.forEach((item, index) => {
            
            fetch(`/api/list/${item.id}`)
                .then((res) => {return res.json()}) //Lo tengo en json
                .then((producto) => {
                    if (producto) {
                        cuerpoCarrito.innerHTML += `
                        <tr>
                        <th scope="row" class="centrado-carrito"> ${index + 1} </th>
                        <td class="table-carrito-camiones centrado-carrito" data-title="Camión">
                            <img src="/img/${producto.ruta_img}" alt="camión-carga-blanco" >
                        </td>
                        <td class="table-carrito-recorrido centrado-carrito "  data-title="Recorrido">
                            <p class="fs-3 text-center text-light"> Mercadería: ${producto.tipo_mercaderia.nombre}</p>
                        </td>
                        <td class="table-carrito-precio centrado-carrito" data-title="Precio">
                            <p class="fs-3 text-center text-light">u$s${producto.precio_km}/km</p>
                        </td>
                        <td class="table-carrito-cantidad centrado-carrito" data-title="Cantidad">
                                <p class="fs-3 text-center text-light">${item.cantidad}</p>
                            
                        </td>
                        <td class="table-carrito-cantidad centrado-carrito" data-title="Cantidad">
                            <button class="btn-home-inicio-sesion button-h quitarProducto" data-id="${producto.id}"> Eliminar </button>
                        </td>
                        </tr>
                        `
                        productos.push({id_vehiculo: producto.id, modelo: producto.modelo, precio: parseInt(producto.precio_km), cantidad: item.cantidad});
                        
                    }else{
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                    };
                    EliminarProducto()
                })
                .then(() => {
                    //Calculo el total de los productos
                    document.querySelector('.totalCarrito').innerText = `Total: ${precioTotal(productos)}`;
                });
            
        });

        //Función que captura el boton y el evento de click - pero no el borrado propiamente dicho
        function EliminarProducto() {
            let botonEliminar = document.querySelectorAll('.quitarProducto')
            botonEliminar.forEach((boton) => {
                boton.addEventListener('click', eliminarProductoCarrito)
                boton.addEventListener('click', () => {
                    location.reload()
                })  
                
            });
        };
        //funcion que borra, splice del array carrito en el index.
        function eliminarProductoCarrito(e) {
            index = carrito.findIndex((producto) => producto.id === e.target.dataset.id)
            carrito.splice(index, 1)
            return localStorage.setItem('carrito', JSON.stringify(carrito));
        };

        //Por post finalizo la compra, escucho el formulario de contratar
        let formularioComprar = document.getElementById('formularioComprar');
        formularioComprar.addEventListener('submit', (e) => {
            e.preventDefault();
            productos.forEach((producto) => {
                const data = {
                    id_vehiculo: producto.id_vehiculo,
                    modelo: producto.modelo,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                    total: precioTotal(productos)
                }; 
                
                //Guardo el registro de la compra en la base de datos
                fetch('/api/checkout', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(data)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.ok) { // en el controlador doy respuesta ok si sale todo bien
                            vaciarCarrito();
                            location.href = '/user/perfil'
                        }
                    })
                
            })
        })
    }
});