const contenedorTarjetas = document.getElementById("content-mokepones"); //Insertar las tarjetas de los mokepones
const sectionSeleccionarAtaque = document.getElementById('Choose-atack');//Declarar la zona que vamos a ocultar y mostrar
const sectionVerMapa = document.getElementById('seeMap');
const mapa = document.getElementById('map')
let lienzo = mapa.getContext("2d")
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png';
let intervalo;
const sectionBtn = document.getElementById('Reload');//Declarar la zona que vamos a ocultar
const botonMascotaJugador = document.getElementById('select-pet'); //boton seleccionar mascota
const contenedorAtaques = document.getElementById("atacks-content");
let btn_fuego; 
let btn_agua; 
let btn_tierra; // botón seleccionar ataques 
const btn_reload = document.getElementById('reload-button');

let inputHipodoge;
let inputCapipepo;
let inputRatigueya; //Definir los input radio (ln:91)
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
let spanMascotaJuador = document.getElementById('mascota-jugador'); //Declarar span para cambiar el contenido
let mascotaJugador; //Identificar que mokepon es para sus ataques
let mascotaJugadorObjeto // Identificar qué mokepon es para su imágen
let jugadorId= null;
let enemigoId = null;
const sectionSeleccionarMascota = document.getElementById('Choose-pet'); //Declarar el contenido que vamos a ocultar
const spanMascotaEnemigo = document.getElementById('mascota-enemigo'); //Declarar span para hacerlo dinámico

let ataquesMokeponesEnemigos = [];
let mokepones = []; //Crear objetos literales. Es decir, un array cuyos hijos son objetos
let mokeponesEnemigos = []
let opc_mokepones; //Insertar la estructura de los objetos al html
let opc_ataques; //Insertar la estructura de los botones dinámicos
let botones = [];
let ataque_jugador = [];
let ataque_enemigo = [];
let indexAtaqueJugador = [];
let indexAtaqueEnemigo = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vida_jugador = 3;
let vida_enemigo = 3;

const ph_jugador = document.getElementById('phPet');
const ph_enemigo = document.getElementById('phPetEnemy');

const marcadorFinal = document.getElementById('results'); /*no hacer esto apilable, que se genere un tras otro; NO crees el 
"createElement" ni el "appendChild" y usa la propiedad innerHTML solmante*/
const enemyAtacks = document.getElementById('enemy-atacks'); 
const playerAtacks = document.getElementById('player-atacks'); //Identificar dónde se pondrá en el html
 
//responsive del canvas
const anchoMaximoDelMapa = 350;
let alturaBuscada;
let anchoDelMapa = window.innerWidth - 20; // Esto permite que al ser una pantalla pequeña, hayan 20 pixeles de espacio entre el marco.

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa;
}
alturaBuscada = anchoDelMapa * 600 / 800 //La regla de tres 

mapa.width = anchoDelMapa;
mapa.height = alturaBuscada;


// Crear clase y constructor para crear objetos de tipo instancia
class Mokepon {
    constructor (nombre, foto, vida, fotoMapa, id=null) {
        this.id = id
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aletorie(0, mapa.width - this.ancho);
        this.y = aletorie(0, mapa.height -this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon() {
        lienzo.drawImage(
        
            this.mapaFoto,//imagen que debe dibujar
            this.x, //posición en x
            this.y, //posición en y
            this.ancho, //ancho
            this.alto //alto
        );
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png'); //objetos instancia
let capipepo = new Mokepon('Capipepo', './assets/mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya = new Mokepon('Ratigueya','./assets/mokepon_ratigueya_attack.png',5, './assets/ratigueya.png');
let langostelvis = new Mokepon('Langostelvis','./assets/mokepon_langostelvis_attack.png',5, './assets/langostelvis.png');
let tucapalma = new Mokepon('Tucapalma','./assets/mokepon_tucapalma_attack.png',5, './assets/tucapalma.png');
let pydos = new Mokepon('Pydos','./assets/mokepon_pydos_attack.png',5, './assets/pydos.png');

const HIPODOGE_ATAQUES = [ 
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'ground 🌱', id: 'type-ground'} //crear objetos de tipo literal .json
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES) //spread

const CAPIPEPO_ATAQUES = [
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'fire 🔥', id: 'type-fire'}    
]
capipepo.ataques.push(...CAPIPEPO_ATAQUES) 

const RATIGUEYA_ATAQUES = [
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'ground 🌱', id: 'type-ground'}
]
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

const LANGOSTELVIS_ATAQUES = [
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'ground 🌱', id: 'type-ground'}
]
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES) 

const TUCAPALMA_ATAQUES = [
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'fire 🔥', id: 'type-fire'},
    { nombre: 'fire 🔥', id: 'type-fire'}
]
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

const PYDOS_ATAQUES = [
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'ground 🌱', id: 'type-ground'},
    { nombre: 'water 💧', id: 'type-water'},
    { nombre: 'water 💧', id: 'type-water'}
]
pydos.ataques.push(...PYDOS_ATAQUES) 

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

//Empezar a interactuar con el HTML 👇

window.addEventListener('load', iniciarJuego) //Solo cuando la página haya cargado, puedes ejecutar la función "Iniciar Juego"

function iniciarJuego() {
    mascotaJugadorObjeto = extraerObjetoMokepon(mascotaJugador); // Obtener imagen

    sectionSeleccionarAtaque.style.display = 'none' //Ocultar el contenido de seleccionar ataque, hasta que se seleccione la mascota
    sectionBtn.style.display = 'none'//Ocultar el botón de reinicio, hasta que se complete el juego (ln: 159)
    sectionVerMapa.style.display = 'none'
    //Antes de hacer funcionales los botones, necesitamos hacer una estructura para insertar la información de los mokepones al HTML 👇
    mokepones.forEach( (mokepon) => { //Después del forEach, se está declarando una variable
        opc_mokepones = `
        <input type="radio" name="pet" id="${mokepon.nombre}"> <!--css ln: 54-->
        <label class="tarjet-mokepon" for="${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
        <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
        contenedorTarjetas.innerHTML += opc_mokepones;   
        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya'); 
        inputLangostelvis =document.getElementById('Langostelvis');
        inputTucapalma = document.getElementById('Tucapalma');
        inputPydos = document.getElementById('Pydos')
        //Definir los input radio
    }
    )
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador); //evento clic, ejecute función seleccionar mascota
    btn_reload.addEventListener("click", reiniciarJuego);
    unirseAlJuego()
}

function unirseAlJuego() { //Consumiento el api de express.js y fecth: API Rest
    fetch("http://localhost:8080/unirse")//Llamada tipo get que es una petición asincrona que trae un objeto
        .then(function (res) { //server send the id as the res
            if (res.ok) {
                res.text() //It becomes the id to text
                    .then(function (respuesta) { //respuesta has the id
                        jugadorId = respuesta;
                    })
            } 
        })
}

function seleccionarMascotaJugador() { //Función a ejecutar luego del clic al botón
//Cambiar el contenido del HTML 👇
sectionSeleccionarMascota.style.display = 'none'; //Ocultar el contenido de mascota

    if (inputHipodoge.checked) { //Si el primer input fue seleccionado... 
        spanMascotaJuador.innerHTML = inputHipodoge.id //Inserte en el span la palabra 'Hipodoge'
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJuador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJuador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if (inputLangostelvis.checked) {
        spanMascotaJuador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else if (inputTucapalma.checked) {
        spanMascotaJuador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputPydos.checked) {
        spanMascotaJuador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    }
    else {
        alert('No has seleccionado un makipan');
    }
    enviarMokepon(mascotaJugador);
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = 'flex'
    iniciarMapa();
}

function enviarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, { //segundo parametro a la funct fetch, que es un objeto json.
        method: 'post',
        headers: { //metadatos a envíar
            'Content-Type': 'application/json' //indicar tipo de archivos a envíar al servidor
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })//El standard de fetch dice que todo json debe envíarse como un string
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques;

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques); // Crear otra funcion para mostrar los botones en el html
}

function mostrarAtaques(ataques) {
    ataques.forEach ( (ataque) => {
        opc_ataques = `<button id="${ataque.id}" class="btn-atack BAtaque">${ataque.nombre}</button>`;
        contenedorAtaques.innerHTML +=opc_ataques;
    }
    )
    //Declarar el id 👇
    btn_fuego = document.getElementById('type-fire');
    btn_agua = document.getElementById('type-water');
    btn_tierra = document.getElementById('type-ground');
    botones = document.querySelectorAll('.BAtaque'); /**Ya que un id no puede repetirse, a partir de una clase, selecciona todos 
    los elementos que tengan algo en común; los botones; para que funcionen, generando una lista de nodos*/
}

function seleccionarMascotaEnemigo(enemigo) { //También sirve para mostrar y/o ocultar uno que otro contenido
    //Generar mascota enemigo 👇
    spanMascotaEnemigo.innerHTML =enemigo.nombre; //el array mokepones[el número aleatorio] y la propiedad nombre del objeto que tiene dentro
    ataquesMokeponesEnemigos = enemigo.ataques;

    secuenciaAtaques();
}

function secuenciaAtaques() {
    botones.forEach( (boton) => {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent==='fire 🔥') {
                ataque_jugador.push('fire');
                console.log(ataque_jugador);
                boton.style.background= '#678983';
                btn_fuego.disabled=true; //deshabitar botones
            } else if (e.target.textContent==='water 💧') {
                ataque_jugador.push('water');
                console.log(ataque_jugador);
                boton.style.background= '#678983';
                btn_agua.disabled=true; //deshabitar botones
            } else if (e.target.textContent==='ground 🌱') {
                ataque_jugador.push('ground');
                console.log(ataque_jugador);
                boton.style.background= '#678983';
                btn_tierra.disabled=true; //deshabitar botones
            } 
            if (ataque_jugador.length===5) {
                enviarAtaques();
            }
        })
    }
    )   
}

function ataqueAleatorioEnemigo() { 

    let tipo_ataque = aletorie(0, ataquesMokeponesEnemigos.length - 1); //mokepones.array cuenta el cero. Por eso hay que quitarle 1
    if (tipo_ataque == 0 || tipo_ataque == 1) { //Solo hay cinco rondas, la cantidad de ataques varian
        ataque_enemigo.push('fire');
    } else if (tipo_ataque== 3 || tipo_ataque == 4) { 
        ataque_enemigo.push('water');
    } else {
        ataque_enemigo.push('ground');
    }
    console.log(ataque_enemigo);
    inicarCombate();
}

function indexRivales (jugador, enemigo) {
    indexAtaqueJugador = ataque_jugador[jugador];
    indexAtaqueEnemigo = ataque_enemigo[enemigo];
}

function inicarCombate() { //Validar que hayan sido seleccionados los cinco ataques
    if (ataque_jugador.length === 5) {
        combate();
    }
}

function combate() {
    clearInterval(intervalo)
    for (let index = 0; index < ataque_jugador.length; index++) {
        if (ataque_jugador[index] === ataque_enemigo[index]) {
            indexRivales(index, index);
            crearMensaje('tying');
        } else if (ataque_jugador[index]== 'fire' && ataque_enemigo[index] =='ground' || ataque_jugador[index]== 'ground' && ataque_enemigo[index] == 'water' || ataque_jugador[index]== 'water' && ataque_enemigo[index] == 'fire')  {
            indexRivales(index, index);
            crearMensaje('winning');
            victoriasJugador++;
            ph_jugador.innerHTML = victoriasJugador;    
        } else {
            indexRivales(index, index);
            crearMensaje('losing');
            victoriasEnemigo++
            ph_enemigo.innerHTML = victoriasEnemigo;

            //ph_jugador.innerHTML = vida_jugador;
        } 
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador < victoriasEnemigo) {
        crearMensajeFinal('Mmm, F for you, dude')
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Congratulations, you win!')
    } else {
        crearMensajeFinal('JesusChrist, its a tie!')
    }
}

function crearMensaje(resultado) {//Crear varios párrafos con js
    let nuevoAtaqueEnemigo = document.createElement('p');
    let nuevoAtaqueJugador = document.createElement('p'); //Crear los parrafos.

    marcadorFinal.innerHTML = resultado;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador; //Asignar los valores a los párrafos
   
    enemyAtacks.appendChild(nuevoAtaqueEnemigo); //POO: appendChild hace que su parametro se haga hijo del objeto
    playerAtacks.appendChild(nuevoAtaqueJugador); //Asignarle el contenido del html sus hijos, createElement y los innerHtml
}

function crearMensajeFinal(resultadoFinal) {//Crear varios párrafos con js y mostrar y/o ocultar secciones
    marcadorFinal.innerHTML =  resultadoFinal //Declarar la zona que vamos a mostrar e dentificar dónde se pondrá en el html

    //Mostrar botón reiniciar 👇
    sectionBtn.style.display = 'block'
}

function iniciarMapa() {

    mascotaJugadorObjeto = extraerObjetoMokepon(mascotaJugador);
    // En la variable intervalo, declara una variable asincronica, que hace que cada 200 mls, ejecute la función pintar personaje
    intervalo = setInterval(pintarCanvas, 200); 
    window.addEventListener('keydown',sePresionoTecla); //no se puede acceder al keydown a través del document
    window.addEventListener('keyup', stopmove);
}

function extraerObjetoMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX; // con la variable intervalo, esto se ejecuta cada 200 ml
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    
    lienzo.clearRect(0, 0, mapa.width, mapa.height) //Limpia el canvas desde la posición 0,0 hasta el final del mismo
    lienzo.drawImage(
        mapaBackground, //imagen a dibujar
        0, //posicion en x
        0, // posicion en y
        mapa.width, //ancho
        mapa.height //alto
    );
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon();
        revisarColision(mokepon);
    })    
}

function stopmove() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(event) { //Esa función keydown o keyup, nos manda un evento; la tecla que se oprimió
    switch (event.key) {
        case 'ArrowUp': 
            moveUp()
        break;
        case 'ArrowDown': 
            moveDown()    
        break;
        case 'ArrowLeft': 
            moveLeft()    
        break;
        case 'ArrowRight': 
            moveRight()    
        break;
        default:
            break;
    }
}

function moveUp() {
    mascotaJugadorObjeto.velocidadY = -5;
    pintarCanvas()
}

function moveDown() {
    mascotaJugadorObjeto.velocidadY = 5;
    pintarCanvas()
}

function moveRight() {
    mascotaJugadorObjeto.velocidadX = 5;
    pintarCanvas()
}

function moveLeft() {
    mascotaJugadorObjeto.velocidadX= -5;
    pintarCanvas()
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto 
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto 
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return;
    } else {
        stopmove();
        clearInterval(intervalo)
        enemigoId = enemigo.id;
        sectionSeleccionarAtaque.style.display = 'flex'; //Mostrar el contenido de ataque
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, { //segundo parametro a la funct fetch, que es un objeto json.
    method: 'post',
    headers: { //metadatos a envíar
        'Content-Type': 'application/json' //indicar tipo de archivos a envíar al servidor
    },
    body: JSON.stringify({
        x:x,
        y:y
    })//El standard de fetch dice que todo json debe envíarse como un string
}) .then(function(res) {
    if (res.ok) {
        res.json()
            .then(function ({enemigos}) { //extrae el json del enemigo
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo=null;
                        const mokeponNombre =enemigo.mokepon.nombre || ""
                        if (mokeponEnemigo !==undefined) {
                            switch (mokeponNombre) {
                                case 'Hipodoge':
                                    mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemigo.id); //objetos instancia
                                    break;
                                case 'Capipepo':
                                    mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemigo.id);
                                    break;
                                case 'Ratigueya':
                                    mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepon_ratigueya_attack.png',5, './assets/ratigueya.png', enemigo.id);
                                    break;
                                case 'Langostelvis':
                                    mokeponEnemigo = new Mokepon('Langostelvis','./assets/mokepon_langostelvis_attack.png',5, './assets/langostelvis.png', enemigo.id);
                                    break;
                                case 'Tucapalma':
                                    mokeponEnemigo = new Mokepon('Tucapalma','./assets/mokepon_tucapalma_attack.png',5, './assets/tucapalma.png', enemigo.id);
                                    break;
                                case 'Pydos':
                                    mokeponEnemigo = new Mokepon('Pydos','./assets/mokepon_pydos_attack.png',5, './assets/pydos.png', enemigo.id);
                                    break;
                            }
                            mokeponEnemigo.x = enemigo.x;
                            mokeponEnemigo.y = enemigo.y;
                            return mokeponEnemigo;
                        }
                })
            }) 
    }
})
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataque_jugador
        })
    }) 
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataque_enemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function aletorie(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function reiniciarJuego() {
    location.reload() //Recarga la URL
}