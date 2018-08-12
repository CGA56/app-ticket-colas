const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        /**
         * Propiedades
         */
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4Tickets = [];

        // leeer jason
        let data = require('../data/data.json');

        // Es el mismo dia?
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4Tickets = data.ultimos4Tickets;

        } else {
            this.reiniciarConteo();
        }
    }


    siguienteTicket() {
        this.ultimo += 1;
        //  Se crea un nuevo ticket
        let ticket = new Ticket(this.ultimo, null);
        //  Se agrega un ticket
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    };

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4Ticket() {
        return this.ultimos4Tickets;
    }


    atenderTicket(nroEscritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let nroTicket = this.tickets[0].numero;
        // Eliminar el primer elemento el arreglo
        this.tickets.shift();

        let atenderTicket = new Ticket(nroTicket, nroEscritorio);
        // Agrega al inicio del arreglo
        this.ultimos4Tickets.unshift(atenderTicket);
        // // borrar atendidos
        if (this.ultimos4Tickets.length > 4) {
            // borrar ultimo
            this.ultimos4Tickets.splice(-1, 1);
        }

        this.grabarArchivo();
        return atenderTicket;
    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4Tickets = [];
        console.log('Se a inicicializado el sistema.');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
                ultimo: this.ultimo,
                hoy: this.hoy,
                tickets: this.tickets,
                ultimos4Tickets: this.ultimos4Tickets

            }
            // Leer info de un archivo json
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }



}


module.exports = {
    TicketControl
};