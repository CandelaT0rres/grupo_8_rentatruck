window.addEventListener("load", () => {

    function vaciarCarrito() {
        localStorage.removeItem('carrito');
    };

    function precioTotal(productos) {
       
        return productos.reduce((acum, producto) =>  (acum += (producto.precio * producto.cantidad)),0);
    }

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
                            <button class="btn-home-inicio-sesion button-h "> Eliminar </a></button>
                        </td>
                        </tr>
                        `
                        productos.push({viaje_id: 1, modelo: producto.modelo, precio: parseInt(producto.precio_km), cantidad: item.cantidad})
                    
                    }else{
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                    };

                })
                //Calculo el total de los productos
                document.querySelector('.totalCarrito').innerText = `${precioTotal(productos)}`;
        });

    } else {
        
    }
});