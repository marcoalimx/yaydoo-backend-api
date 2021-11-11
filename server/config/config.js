//PORT 
process.env.PORT = process.env.PORT || 5001; 
//ENVIRONMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//secret seed
process.env.SEED = process.env.SEED || "H";
//database
process.env.DATABASE_URL =  process.env.DATABASE_URL || "database-1.cgriqmyweq5c.us-east-2.rds.amazonaws.com"
process.env.USER_DATABASE = process.env.USER_DATABASE || "postgres"
process.env.PASSWORD_DATABASE = process.env.PASSWORD_DATABASE || "Planeacion1*"
process.env.NAME_DATABASE = process.env.NAME_DATABASE || "postgres"