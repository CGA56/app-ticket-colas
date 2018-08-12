// Comando para obtener la comunicacion



var socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connectado');


});


socket.on('disconnect', function() {
    console.log('Usuario desconectado');
});

// Traer el estado actual (cargando)
socket.on('estadoActual', function(estadoActual) {
    label.text(estadoActual.actual);

});


$('button').on('click', function() {
    // no se le envia ningun parametro y se recibe el callback
    socket.emit('siguienteTicket', null, function(respuestaServer) {
        label.text(respuestaServer);

    });
});