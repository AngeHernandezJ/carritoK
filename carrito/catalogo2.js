let productos = [];

fetch("./productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
});

const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <div class="product-card" data-product-id="${producto.id}">
                <div class="product-card__container">
                    <div class="product-card__btn cart" data-tooltip="agregar al carrito"><span class="material-symbols-rounded"> shopping_bag </span></div>
                    <div class="product-card__btn fav" data-tooltip="me gusta"><span class="material-symbols-rounded"> favorite </span></div>
                    <div class="product-card__img">
                        <img src="${producto.images}" alt="${producto.name}" />
                    </div>
                </div>
                <div class="producto-detalles">
                    <div class="product-card__text">${producto.name}</div>
                    <div class="product-card__text">${producto.artist}</div>
                    <div class="product-card__text">${producto.description}</div>
                    <div class="product-card__text">${producto.tecnica}</div>
                    <div class="product-card__text">${producto.materiales}</div>
                    <div class="product-card__text">${producto.ancho}</div>
                    <div class="product-card__text">${producto.altura}</div>
                    <div class="product-card__text">${producto.profundidad}</div>
                    <div class="product-card__price">${producto.price}</div>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
    document.querySelectorAll(".product-card__btn").forEach(boton => {
        boton.addEventListener("click", function() {
            const productoId = this.closest('.product-card').dataset.productId;
            const producto = productos.find(p => p.id == productoId);
            console.log(producto);
            localStorage.setItem('Producto', productoId);
            localStorage.setItem('productosEnCarrito', 1);
            actualizarNumeroCarrito();
        });
    });
}



/*addEventListener("DOMContentLoaded", (event) => {contenedorNumCarrito.innerHTML=productosEnCarrito});*/
function actualizarNumeroCarrito() {
    const productosEnCarrito = localStorage.getItem("productosEnCarrito");
const contenedorNumCarrito = document.querySelector("#numerito");
    //const productosEnCarrito = localStorage.getItem("productosEnCarrito") || [];
    //const totalProductos = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    /*if(productosEnCarrito==null){contenedorNumCarrito.innerHTML = ""}
    else{contenedorNumCarrito.innerHTML = "1"}*/
    contenedorNumCarrito.innerHTML = productosEnCarrito;
}
window.addEventListener('storage', actualizarNumeroCarrito);

actualizarNumeroCarrito();