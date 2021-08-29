
/**
 * Here is where we should register event listeners and emitters. 
 */
// import io from socket.io
 var io
 var gameSocket
 // gamesInSession stores an array of all active socket connections
 var gamesInSession = []
 var everyonesUsername = new Array();
var array = [], shufle = [];
 const initializeGame = (sio, socket) => {
     /**
      * initializeGame sets up all the socket event listeners. 
      */
     // initialize global variables.
     io = sio 
     gameSocket = socket 
    //console.log(`initialize game has started! and io is ${io}`)

    //console.log(`io is: ${socket}`)
     // pushes this socket to an array which stores all the active sockets.
     gamesInSession.push(gameSocket)
 
     // Run code when the client disconnects from their socket session. 
     gameSocket.on("disconnect", onDisconnect)
 
     // Sends new move to the other socket session in the same room. 
     gameSocket.on("new move", newMove)
 
     // User creates new game room after clicking 'submit' on the frontend
     gameSocket.on("createNewGame", createNewGame)
 
     // User joins gameRoom after going to a URL with '/game/:gameId' 
     gameSocket.on("playerJoinGame", playerJoinsGame)
 
     gameSocket.on('request username', requestUserName)
 
     gameSocket.on('recieved userName', recievedUserName)

     // register event listeners for video chat app:
     videoChatBackend()
 }
 function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
 
 function videoChatBackend() {
     // main function listeners
     gameSocket.on("callUser", (data) => {
         io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
     })
 
     gameSocket.on("acceptCall", (data) => {
         io.to(data.to).emit('callAccepted', data.signal);
     })
 }   
 

 
 function playerJoinsGame(idData) {
     /**
      * Joins the given socket to a session with it's gameId
      */
 
     // A reference to the player's Socket.IO socket object
     var sock = this
     
     // Look up the room ID in the Socket.IO manager object.
     var room = io.sockets.adapter.rooms.get(idData.gameId)
     //console.log(io.sockets.adapter.rooms)
    //  console.log(room)
    //  console.log("")
    //  console.log(idData)
    
    gameSocket.on('addSockets', (data) => {
        // console.log('we got here')
            if (everyonesUsername.length == 0){
                everyonesUsername.push({socketid: data.socketid, username: data.username, gameid: data.gameId});
            }
            let i = everyonesUsername.length
            if (data.socketid != everyonesUsername[i-1].socketid && i!=0){
                everyonesUsername.push({socketid:data.socketid, username: data.username, gameid: data.gameid})
                console.log(everyonesUsername[i])
            }
            
    })
    gameSocket.on('fold', data => {
        io.emit('folded', data)
    })
    gameSocket.on('roundOver', (data) => {
        if (data.flop == false) {
            io.emit('flopTime', data.flop)
        }
        else if (data.turn == false) {
            io.emit('turnTime', data.turn)
        }
       else if (data.river == false) {
            io.emit('riverTime', data.river)
        }
        else if (data.river == true) {
            io.emit('showdown')
        }
    })
    gameSocket.on('blindsCame', data => {
        io.emit('blindsCameIndeed', data)
    })
    gameSocket.on('check', data => {
        io.emit('checked', data)
    })
    gameSocket.on('waitingOnPlayer', data=>{
        io.emit('playerNoLongerWaiting', data)
    })
    gameSocket.on('nextRound', data => {
        io.emit('nextRoundIndeed', data)
    })
    gameSocket.on('anothertempzero', data => {
        io.emit('anothertemp', data)
    })
    gameSocket.on('removedisbitch', (data) => {
        var bindex = everyonesUsername.findIndex(i => i.socketid === data.socketid);
        console.log(`${data.socketid} is gone`)
        everyonesUsername.splice(bindex, 1);
        if (array[0] == data.socketid) {
            array = [];
            console.log('removedisbitch cleared array')
        }
    })
    gameSocket.on('shuffle', (balls) => {
        if (array[0] !== this.id){
            console.log('shuffled')
            shuffle(balls);
            for(var i = 0; i < balls.length; i++){
                shufle[i] = balls[i];
            }
            array[0] = this.id
            }
        if (array.length == 0)
        {
            array.push(this.id)
            shuffle(balls);
            for(var i = 0; i < balls.length; i++){
                shufle[i] = balls[i];
            }
        // console.log('shuffled!')}
        }
    io.emit('shuffled', shufle)

    })
    gameSocket.on('startdagame', () => {
        io.emit('starteddagame', everyonesUsername)
    })    
     // If the room exists...
     if (room === undefined) {
         this.emit('status' , "This game session does not exist." );
         return
     }
     if (room.size >= 6) {
        // Otherwise, send an error message back to the player.
        this.emit('status' , "There are too many people playing in this room." );
    }
     if (room.size < 5) {
         // attach the socket id to the data object.
         idData.mySocketId = sock.id;
 
         // Join the room
         sock.join(idData.gameId);
 
        //  console.log(room.size)
 
        //  if (room.size === 2) {
        //      io.sockets.in(idData.gameId).emit('start game', idData.userName)
        //  }
 
         // Emit an event notifying the clients that the player has joined the room.
         io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);
         if (room.size >= 2) {
             io.emit('startbutton', 'hi');
         }
 
     } 
 }
 
 
 function createNewGame(gameId) {
     // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
     this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});
 
     // Join the Room and wait for the other player
     this.join(gameId)
 }
 
 
 function newMove(move) {
     /**
      * First, we need to get the room ID in which to send this message. 
      * Next, we actually send this message to everyone except the sender
      * in this room. 
      */
     
     const gameId = move.gameId 
     
     io.to(gameId).emit('opponent move', move);
 }
 
 function onDisconnect() {
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i, 1);
     var index = everyonesUsername.findIndex(i => i.socketid === this.id);
     console.log(`${this.id} is gone`)
     if(this.id == array[0]){
        array = [];
        console.log('array emptied')
    }
     everyonesUsername.splice(index, 1);
     console.log(array[0])
     
 }
 
 
 function requestUserName(gameId) {
     io.to(gameId).emit('give userName', this.id);
 }
 
 function recievedUserName(data) {
     data.socketId = this.id
     io.to(data.gameId).emit('get Opponent UserName', data);
 }
 
 exports.initializeGame = initializeGame