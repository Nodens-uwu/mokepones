# mokepones game!

In 2021 I recreate a local multiplayer game, created with HTML, CSS, JS, and Node.js. The players must select their characters and face each other in battles with 6 different mokepones. ⚔️  

# 🛠️ prework  
- make sure you've got installed docker desktop or docker daemon in your s.o 🐋  
    - If not, validate if you've got installed node.js in your local pc 🧩
- you should have a code editor as vsc.

## 🕹️ How to run it and play?  

1. In public directory, create a new directory called: `assets`.  
2. The .zip contains the images in assets, so unzip it and save them in assets directory.  
3. delete the .zip file below and also remove the package.json and package-look.json.  
4. Clic at the lower left area of your vsc and select "reopen in the container"
**Disclaimer:** If you cannot run the *devcontainer* and you've got installed *node* in your pc, run : `npm init`  
4. When the remote window is open, create a new terminal and run the following commands:
- install express & cors `npm install cors express`  
- Initialize the project: node `index.js`  

## 👨‍💻 Technologies used  
- web servers with express.js
- Manipulating the DOM
- Rest API design
- CRUD
- POO
- Async / await
- cache memory
- dynamic url 
- http responses

## 🔥 Features:  

context: 

while two sessions has been stablished, the player can move through a small map with their position keys.

The players can attack each other through a REST API

Coordinating player positions in real-time.

Assigning attacks and detecting enemies.

Implicit Asynchronous Request Handling


## ✍️ things I learned:  

it lays the foundation for client-server communication.


- Web server setup with Express.js configuring middlewares (cors, express.json, express.static).

- Implementing cors() to allow cross-origin requests and custom headers (Access-Control-Allow-Origin).

- REST API Design: Defining routes and endpoints for game operations (/join, /mokepon/:playerId, etc.) andsing HTTP methods (GET, POST) for specific actions.

- CRUD-like Operations: creating and updating entities (Player, Mokepon) in cache memory.

- In-Memory data management: Temporary storage of players in an array (players). Persisting game states (position, attacks, etc.) without a database.

- Dynamic Routes and Parameters: using route parameters (:playerId) to identify players and extracting data from req.params and req.body.

- Client-Server Communication with JSON: serialization/deserialization (express.json()).

- Sending structured responses (res.send({ enemies })): serving static content from the public folder (express.static).

- Although async/await is not used directly, the server is designed to handle multiple concurrent requests.

- Logging and debugging: using console.log to track states (players, name, etc.).