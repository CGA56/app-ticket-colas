// Comando coneccion
var socket = io();

// obtener parametros de url

var searchParams = new URLSearchParams(window.location.search);
// Si no existe el parametro escritorio
if (!searchParams.has('escritorio')) {


    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}
// rescatar el parametro
var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);


// listener del botton
$('button').on('click', function() {

    socket.emit('atenderSiguienteTicket', { escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text(resp.numero);



    });
});