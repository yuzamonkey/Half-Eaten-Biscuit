"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apolloConfig_1 = require("./apolloConfig");
const app = express_1.default();
const { ApolloServer } = require('apollo-server-express');
// TODO, 
// may not optimal for browser caching
const frontendRoutes = [
    '/',
    '/signin',
    '/signup',
    '/messages',
    '/messages/:id',
    '/jobmarket/queries',
    '/jobmarket/sendquery',
    '/jobmarket/myqueries',
];
frontendRoutes.forEach(route => app.use(route, express_1.default.static("public")));
const server = new ApolloServer(apolloConfig_1.createConfig());
server.applyMiddleware({ app });
const PORT = process.env.PORT || 5000;
app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
