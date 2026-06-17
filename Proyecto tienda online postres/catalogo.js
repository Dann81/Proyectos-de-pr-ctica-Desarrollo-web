const productosCatalogo = [
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
    {
        id: 4,
        nombre: "Tarta de Limón",
        precio: 12000,
        imagen: "https://i.pinimg.com/736x/17/a9/01/17a901d95107f7459c4072c4e0b11f14.jpg"
    },
    {
        id: 5,
        nombre: "Cupcakes de Vainilla",
        precio: 10000,
        imagen: "https://i.pinimg.com/736x/39/8a/55/398a55d39687ad4cf086d85b51551ee1.jpg"
    },
    {
        id: 6,
        nombre: "Milhojas de Arequipe",
        precio: 8000,
        imagen: "https://i.pinimg.com/736x/82/76/c8/8276c84179646beda8c3c285158202a7.jpg"
    },
    {
        id: 7,
        nombre: "Cinnamon Rolls",
        precio: 15000,
        imagen: "https://i.pinimg.com/736x/a3/32/34/a332346f9b7317822fe59eaaff9dc922.jpg"
    },
    {
        id: 8,
        nombre: "Galletas Red Velvet",
        precio: 2500,
        imagen: "https://i.pinimg.com/736x/3b/5c/c4/3b5cc4915fe6969084f8f438eefca2c5.jpg"
    },
    {
        id: 9,
        nombre: "Tiramisú",
        precio: 3000,
        imagen: "https://i.pinimg.com/1200x/2c/78/fb/2c78fbe41511e29ded57a9c171d6f9cc.jpg"
    },
    {
        id: 10,
        nombre: "Mochis de Oreo",
        precio: 1300,
        imagen: "https://i.pinimg.com/1200x/3a/8e/bd/3a8ebdbe4a99c04aec22bcb86760088c.jpg"
    },
];

const contenedorCatalogo = document.getElementById("catalogo-container");

function renderizarCatalogo() {
    contenedorCatalogo.innerHTML = "";

    productosCatalogo.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("product-card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="price">$${producto.precio.toLocaleString('es-CO')}</p>
            <button class="add-to-cart-btn" data-id="${producto.id}">Añadir al carrito</button>
        `;
        contenedorCatalogo.appendChild(tarjeta);
    });
}

renderizarCatalogo();