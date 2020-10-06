var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use( express.static('client'));

app.get('/hola-mundo', (req, res) => {
    res.status(200).send("Hola mundo desde una ruta");
});

var messages = [
    {
        id: 1,
        text: 'Bienvenido al chat privado de socket.io y NodeJS',
        nickname: 'Diego'
    }
];

io.on('connection', (socket) => {
    console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado.");

    socket.emit('messages', messages);

    socket.on('add-message', (data) => {
        messages.push( data );
        io.sockets.emit('messages', messages);
    })
});

server.listen(6677, () => {
    console.log( "El servidor está funcionando en https://localhost:6677" );
}); 