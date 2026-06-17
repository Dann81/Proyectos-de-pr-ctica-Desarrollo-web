const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonDigimonJugador = document.getElementById('boton-digimon')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarDigimon = document.getElementById('seleccionar-digimon')
const spanDigimonJugador = document.getElementById('digimon-jugador')

const spanDigimonEnemigo = document.getElementById('digimon-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let digimones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeDigimones
let inputAgumon 
let inputVeemon 
let inputImpmon 
let digimonJugador
let digimonJugadorObjeto
let ataquesDigimon
let ataquesDigimonEnemigo
let botonFireboll
let botonElectroshock 
let botonExplosion
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 700

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class DigimonFighters {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 90
        this.alto = 90
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarDigimon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
     }
}

let agumon = new DigimonFighters("Agumon", "./assets/Agumon.png", 5, "./assets/Agumon.png")

let veemon = new DigimonFighters("Veemon", "./assets/Veemon.png", 5, "./assets/Veemon.png")

let impmon = new DigimonFighters("Impmon", "./assets/Impmon.png", 5, "./assets/Impmon.png")

let agumonEnemigo = new DigimonFighters("Agumon", "./assets/Agumon.png", 5, "./assets/Agumon.png")

let veemonEnemigo = new DigimonFighters("Veemon", "./assets/Veemon.png", 5, "./assets/Veemon.png")

let impmonEnemigo = new DigimonFighters("Impmon", "./assets/Impmon.png", 5, "./assets/Impmon.png")

agumon.ataques.push(
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "💣", id: "boton-explosion" },
)

agumonEnemigo.ataques.push(
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "💣", id: "boton-explosion" },
)

veemon.ataques.push(
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "💣", id: "boton-explosion" },
)

veemonEnemigo.ataques.push(
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🌩️", id: "boton-electroshock" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "💣", id: "boton-explosion" },
)

impmon.ataques.push(
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🌩️", id: "boton-electroshock" },
)

impmonEnemigo.ataques.push(
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "💣", id: "boton-explosion" },
    { nombre: "🔥", id: "boton-fireboll" },
    { nombre: "🌩️", id: "boton-electroshock" },
)

digimones.push(agumon, veemon, impmon)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = "none"

    digimones.forEach((digimon) => {
        opcionDeDigimones = `
         <input type="radio" name="digimon" id=${digimon.nombre} />
            <label class="tarjeta-de-digimon-fighters" for=${digimon.nombre}>
            <p>${digimon.nombre}</p>
            <img src=${digimon.foto} alt=${digimon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeDigimones

     inputAgumon = document.getElementById("Agumon")
     inputVeemon = document.getElementById("Veemon")
     inputImpmon = document.getElementById("Impmon")

    })
    
    botonDigimonJugador.addEventListener('click', seleccionarDigimonJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarDigimonJugador() {
    
    sectionSeleccionarDigimon.style.display = 'none'
    
    
    
    
    if (inputAgumon.checked) {
        spanDigimonJugador.innerHTML = inputAgumon.id
        digimonJugador = inputAgumon.id
    } else if (inputVeemon.checked) {
        spanDigimonJugador.innerHTML = inputVeemon.id
        digimonJugador = inputVeemon.id
    } else if (inputImpmon.checked) {
        spanDigimonJugador.innerHTML = inputImpmon.id
        digimonJugador = inputImpmon.id
    } else {
        alert('Selecciona un digimon')
    }

    extraerAtaques(digimonJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
}

function extraerAtaques(digimonJugador) {
    let ataques
    for (let i = 0; i < digimones.length; i++) {
        if (digimonJugador === digimones[i].nombre) {
            ataques = digimones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)

}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesDigimon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesDigimon
    })

     botonFireboll = document.getElementById('boton-fireboll')
     botonElectroshock = document.getElementById('boton-electroshock')
     botonExplosion = document.getElementById('boton-explosion')
     botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FIREBOLL")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "🌩️") {
                ataqueJugador.push("ELECTROSHOCK")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("EXPLOSION")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarDigimonEnemigo() {
    let digimonAleatorio = aleatorio(0, digimones.length -1)
   
    spanDigimonEnemigo.innerHTML = digimones[digimonAleatorio].nombre
    ataquesDigimonEnemigo = digimones[digimonAleatorio].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log("Ataques enemigo", ataquesDigimonEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesDigimonEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push ('FIREBOLL')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio ==4) {
        ataqueEnemigo.push ('ELECTROSHOCK')
    } else {
        ataqueEnemigo.push ('EXPLOSION')
    }
    console.log(ataqueEnemigo)
   iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueEnemigo[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "FIREBOLL" && ataqueEnemigo
            [index] === "EXPLOSION") {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "ELECTROSHOCK" && ataqueEnemigo
            [index] === "FIREBOLL") {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === "EXPLOSION" && ataqueEnemigo
            [index] === "ELECTROSHOCK") {
                indexAmbosOponente(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador 
         } else {
                indexAmbosOponente(index, index)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
         }
 
    }
    
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITACIONES GANASTE! :D')
    } else {
        crearMensajeFinal ("Lo siento, perdiste :(")
    }
}

function crearMensaje(resultado) {
   

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    digimonJugadorObjeto.x = digimonJugadorObjeto.x + digimonJugadorObjeto.velocidadX
    digimonJugadorObjeto.y = digimonJugadorObjeto.y + digimonJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    digimonJugadorObjeto.pintarDigimon()
    agumonEnemigo.pintarDigimon()
    veemonEnemigo.pintarDigimon()
    impmonEnemigo.pintarDigimon()
    if (digimonJugadorObjeto.velocidadX !== 0 || digimonJugadorObjeto.velocidadY !== 0) {
        revisarColision(agumonEnemigo)
        revisarColision(veemonEnemigo)
        revisarColision(impmonEnemigo)
    }
}

function moverDerecha() {
    digimonJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    digimonJugadorObjeto.velocidadX = -5
}digimonJugadorObjeto
function moverAbajo() {
    digimonJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    digimonJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    digimonJugadorObjeto.velocidadX = 0
    digimonJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break    
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":    
            moverDerecha()  
            break  
        default:
            break;
    }
}

function iniciarMapa() {
    digimonJugadorObjeto = obtenerObjetoDigimon(digimonJugador)
    console.log(digimonJugadorObjeto, digimonJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoDigimon() {
    for (let i = 0; i < digimones.length; i++) {
        if (digimonJugador === digimones[i].nombre) {
            return digimones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaDigimon = 
        digimonJugadorObjeto.y
    const abajoDigimon = 
        digimonJugadorObjeto.y + digimonJugadorObjeto.alto
    const derechaDigimon = 
        digimonJugadorObjeto.x + digimonJugadorObjeto.ancho
    const izquierdaDigimon = 
        digimonJugadorObjeto.x
    if(
        abajoDigimon < arribaEnemigo ||
        arribaDigimon > abajoEnemigo ||
        derechaDigimon < izquierdaEnemigo ||
        izquierdaDigimon > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colision");
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = "none"
    seleccionarDigimonEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)