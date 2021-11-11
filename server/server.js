import express from 'express'; 
import { ApolloServer } from 'apollo-server-express'; 
// import { typeDefs } from './store/schema';
// import { resolvers } from './resolvers';
import modules from './modules'; 
import headerCookie from './middlewares/header-cookie'
import cors from 'cors'
var bodyParser = require('body-parser');

require('./config/config');

const corsOptions = { 
  origin: ['http://localhost:3000', 'http://localhost:3001/', 'http://localhost:3001'],
  credentials: true
}

const context = async ({ req, res }) => {
  try {
    const { headers } = req;
    const DEV = req.headers.host.includes('localhost'); 
    const { hasToken, token } = await headerCookie.getAuthCookie(headers.cookie, DEV)
    if(!token) {
      res.clearCookie("sessionToken");
    }
    if(!hasToken) {
      const options = {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true, // cookie is only accessible by the server
          //secure: true, // only transferred over https
          sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
      }
      res.cookie('sessionToken', token, options)
    }
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    return { req, res, token, headers };
  } catch (e) {
    console.log('Error>', e)
  }
};

//express
const app = express(); 
//creamos server con apolloServer
// const server = new ApolloServer({ typeDefs, resolvers }); 
const server = new ApolloServer({ modules,
    onHealthCheck: () => {
        return new Promise((resolve, reject) => {          
          if (true) {
            resolve();
          } else {
            reject();
          }
        });
      }, 
      context });
//endpoints 
// body
app.use(bodyParser.json({limit:'25mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//body
app.use(require('./routes'))
app.use(cors(corsOptions))
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
server.applyMiddleware({app, path:'/'}); 
var serverLocal = app.listen(process.env.PORT, () => console.log(`El servidor está corriendo en http://localhost:5001${server.graphqlPath}`))
serverLocal.setTimeout(5 * 60 * 1000)
