const productos = [
    {
        id: 1,
        nombre: "Cheescake de Fresa",
        precio: 10000,
        imagen: "https://i.pinimg.com/1200x/de/a0/1a/dea01a87b4e0389b06ea43a19e6af30c.jpg"
    },
    {
        id: 2,
        nombre: "Brownie con Helado",
        precio: 25000,
        imagen: "https://i.pinimg.com/1200x/75/a8/37/75a837508fe222b380345599900eec83.jpg"
    },
    {
        id: 3,
        nombre: "Macarons",
        precio: 1000,
        imagen: "https://i.pinimg.com/736x/b2/3f/83/b23f833c4690e5219b167b23c1034a6f.jpg"
    },
]

const contenedorProductos = document.getElementById("products-container");

function renderizarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="price">$${producto.precio.toLocaleString('es-CO')}</p>
            <button class="add-to-cart-btn" data-id="${producto.id}">Añadir al carrito</button>
        `;

        contenedorProductos.appendChild(tarjeta);
    });
}

renderizarProductos();

let carrito = [];

const contadorCarrito = document.getElementById("cart-counter");

contenedorProductos.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const productoId = parseInt(e.target.getAttribute("data-id"));

        const productoSeleccionado = productos.find(p => p.id === productoId);

        if (productoSeleccionado) {
            agregarAlCarrito(productoSeleccionado);
        }
    }
});

function agregarAlCarrito(producto) {
    carrito.push(producto);

    contadorCarrito.textContent = carrito.length;

    console.log("Carrito actual:", carrito);
}