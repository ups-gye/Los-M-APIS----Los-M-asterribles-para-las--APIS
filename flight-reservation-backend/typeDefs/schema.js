const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Usuario {
        cedula: String!
        nombre: String!
        apellido: String!
        fechaNacimiento: String!
        sexo: String!
    }
    
    type Vuelo {
        codigo: String!
        origen: String!
        destino: String!
        numeroAsientosTotales: Int!
    }

    type Reservation {
        id: ID!
        codigoVuelo: String!
        fecha: String!
        cedula: String!
        estadoReserva: String!
        clase: String!
    }

    type Query {
        getClienteByCedula(cedula: String!): Usuario
        getVuelo(origen: String!, destino: String!): Vuelo
        obtenerReservas(codigoVuelo: String, fecha: String): [Reservation]
    }
        
    type Mutation {
        guardarReserva(codigoVuelo: String!, fecha: String!, cedula: String!, estadoReserva: String!, clase: String!): Reservation
        modificarReserva(id: ID!, codigoVuelo: String, fecha: String, estadoReserva: String, clase: String): Reservation
    }
`;

module.exports = typeDefs;