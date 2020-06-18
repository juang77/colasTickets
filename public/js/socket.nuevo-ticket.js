//Comando para establecer la conexion
var socket = io();

var label = $("#lblNuevoTicket");

socket.on('connection', function() {
    console.log('Conectado al Servidor.');

    console.log('el text del label es:', label.text());

});

socket.on('disconnect', function() {
    console.log('Desconectado al Servidor.');

});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
    console.log(resp.actual);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)

    });

});