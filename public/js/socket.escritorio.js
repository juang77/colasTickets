var socket = io();

socket.on('connection', function() {
    console.log('Conectado al Servidor.');

    console.log('el text del label es:', label.text());

});

socket.on('disconnect', function() {
    console.log('Desconectado al Servidor.');

});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);

        if (resp.message === 'Ya no hay Tickets.') {
            label.text(resp.message);
            alert(resp.message);
            return;
        }

        label.text('Ticket' + resp.numero);
    });
});