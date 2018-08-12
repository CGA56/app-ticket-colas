const { io } = require('../server');
const { TicketControl } = require('../clases/ticket-control');


let ticketControl = new TicketControl();


io.on('connection', (client) => {


    // console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        callback(siguiente);

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Ticket()
    });

    client.on('atenderSiguienteTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        let ultimos4 = ticketControl.getUltimos4Ticket();
        callback(atenderTicket);
        // para enviar a todas las pantallas
        client.broadcast.emit('ultimos4', {
            ultimos4
        });
    });

});