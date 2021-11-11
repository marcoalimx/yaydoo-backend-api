import * as db from '../../database'
import Mutations from './mutations';
import Query from './querys';
import typeDefs from './typeDefs';
import { rejects } from 'assert';
import Handlers from "./../../handlers"; 
import Helpers from "./../../helpers"; 
import bcrypt from "bcrypt-nodejs";

const resolvers = { 
    Mutation: Mutations(db, rejects, Handlers, Helpers, bcrypt),
    Query: Query(db, rejects, Handlers, Helpers, bcrypt)
}

module.exports = { typeDefs, resolvers };