import express from 'express';
import { createConfig } from './apolloConfig';

const http = require('http')
const app = express()
const { ApolloServer } = require('apollo-server-express')

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb' }));

const frontendRoutes = [
  '/',
  '/signin',
  '/signup',
  '/messages',
  '/messages/:id',
  '/jobmarket/jobads/:id',
  '/jobmarket/jobads',
  '/jobmarket/findartists',
  '/jobmarket/sendjobad',
  '/jobmarket/myads',
  '/profiles',
  '/profiles/:id',
  '/settings/credentials',
  '/settings/profile',
  '/settings/groups',
  '/settings/deleteuser',
  '/settings',
  '/creategroup',
  '/createprofile'
]

frontendRoutes.forEach(route => app.use(route, express.static("public")))

app.get('/health', (_req, res) => {
  res.send('bueno')
})

app.get('/version', (_req, res) => {
  res.send('0.0.5, 3.9.2021 17.40')
})

app.get('/log', (_req, res) => {
  const log = [
    '2021/06/25 14.36 add backend testing to pipeline (15.16 does not work, connecting to undefined. Cause?: GitHub Actions does not recognise envvar)',
    '2021/06/25 15.08 tsCompiler: ES2020 -> ES2019',
    '2021/08/15 19.38 lots of new components',
    '2021/08/17 13.10 add css to registration pages',
    '2021/08/17 16.40 filesizelimit, minor ux improvements',
    '2021/08/17 18.25 remove invalid route, caused issue with playground',
    '2021/09/03 17.40 lots of css',
  ]
  res.send(log)
})

const server = new ApolloServer(createConfig())

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

