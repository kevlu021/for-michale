import io from 'socket.io-client'
import socketClient from 'socket.io-client';

const socket = io('http://localhost:8000');
var mySocketId



socket.on("createNewGame", statusUpdate => {
    // console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    // console.log(`socket is ${socket}`);
    mySocketId = statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}
