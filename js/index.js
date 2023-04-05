//npm init es para crear el archivo .json

// Al momento de crear el archivo .json, nos referimos a un archivo index.js, el cual debemos crear

// el npm install express; creará tres archivos, node_modules, package-lock.json y actualizará el archivo package.json, mensiona a expre
// Importa librería de carpeta node_module
const express = require('express') 
const cors =require('cors');

const app = express()

//Quitar ciertos errores:
app.use(cors()) // res.setHeader('Access-Control-Allow-Origin', '*') cabecera para decirle al navegador desde qué origen va a hacer 
app.use(express.json()) //Permitir la transferencia de archivos .json mediante post

const jugadores = []

class Jugador {
  constructor (id) {
    this.id = id;
  }

  asignarMokepon(mokepon) {
    this.mokepon=mokepon
  }
  actualizarPosicion (x, y) {
    this.x = x
    this.y = y
  }

  asignaAtaques(ataques) {
    this.ataques = ataques
  }
 
}
class Mokepon {
  constructor (nombre) {
    this.nombre = nombre;
  }
}

//servicios.
app.get('/unirse', (req, res) => { //url - fn, dos paramentros para recibir y responder al cliente
  const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', '*') //Es inseguro, una cabecera para decirle al navegador desde qué origen va a hacer 
    //peticiones el sevidor 
    res.send(id)
})

app.post('/mokepon/:jugadorId', (req, res) => { // /:Indica una variable dentro de la url
  const jugadorId = req.params.jugadorId || ""
  const nombre = req.body.mokepon || ""
  const mokepon = new Mokepon(nombre)
  
  console.log(nombre)
  const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }
  console.log(jugadores);
  console.log(jugadorId);
  res.end() //Si la const jugadorId no recibe parametros, queda vacía por defecto. Por eso se hace .end()
})

app.post('/mokepon/:jugadorId/posicion', (req, res) => {
  const jugadorId = req.params.jugadorId || ""
  const x = req.body.x || 0
  const y = req.body.y || 0
  const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y)
  }
const enemigos = jugadores.filter((jugador) => {
  return jugadorId!== jugador.id && jugador.mokepon
})
  res.send({
    enemigos //Envía un json de de la lista
  })
})

app.post('/mokepon/:jugadorId/ataques', (req, res) => { //Envíar datos al servidor
  const jugadorId = req.params.jugadorId || ""
  const ataques = req.body.ataques || []
  
  const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignaAtaques(ataques)
  }

  res.end() //Si la const jugadorId no recibe parametros, queda vacía por defecto. Por eso se hace .end()
})

app.get('/mokepon/:jugadorId/ataques', (req, res) => { //Recibir datos del servidor
  const jugadorId = req.params.jugadorId || ""
  const jugador = jugadores.find(jugador => jugador.id === jugadorId)
  
  res.send({
    ataques: jugador.ataques || []
  }) //Si la const jugadorId no recibe parametros, queda vacía por defecto. Por eso se hace .end()
})

// Activar servidor
app.listen(8080, () => {
  console.log("El servidor ya arrancó");  
})
