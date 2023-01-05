window.addEventListener("load", () => {

    //Función para verificar cantidad de elementos del carrito. Si existe devuelvo la cantidad, sino 0
    function productosEnCarrito() {
        return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0;
    };
    //Capturo botón comprar
    let botonCarrito = document.querySelectorAll('.carrito')

    //Capturo span n° carrito
    let carritoNumero = document.querySelector('.carrito-numero');
    carritoNumero.innerText = productosEnCarrito();

    botonCarrito.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito)
                let indice = carrito.findIndex((producto) => producto.id == e.target.dataset.id)
                if (indice != -1) {
                    carrito[indice].cantidad++
                
                }else{
                    carrito.push({id: e.target.dataset.id, cantidad: 1});
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
            } else {
                localStorage.setItem('carrito', JSON.stringify([{id: e.target.dataset.id, cantidad: 1}]));
            };
            carritoNumero.innerText = productosEnCarrito();
           
        })
    });
    
})