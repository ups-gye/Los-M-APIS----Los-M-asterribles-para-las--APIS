const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./typeDefs/schema');
const resolvers = require('./resolvers/resolvers');
const connectDB = require('./config/db');

// Inicializar la aplicación Express
const app = express();

// Habilitar CORS
app.use(cors());

// Conectar a MongoDB
// mongoose.connect('mondodb://localhost:27017/flight-reservations', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('Conectado a mongoDB'))
//     .catch((err) => console.log(err));
connectDB();

// Configurar Apollo Server con GraphQL y Express
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.start().then(() => {
    server.applyMiddleware({ app });

    // Escuchar en el puerto 4000
    app.listen(4000, () => {
        console.log('Servidor corriendo en http://localhost:4000/graphql');
    });
});
