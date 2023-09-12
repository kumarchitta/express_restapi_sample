require('dotenv').config();

// console.log(process.env.DBUSER,process.env.DBPASS,process.env.DBSERVER,process.env.DATABASE,process.env.DBPORT)

const  config = {
    user: process.env.DBUSER, 
    password: process.env.DBPASS, 
    server: process.env.DBSERVER,
    database: process.env.DATABASE,
    port: parseInt(process.env.DBPORT),
    options: {
      trustServerCertificate: true,
      trustedconnection:  true,
      enableArithAbort:  true
      //instancename:  'SQLEXPRESS'  // SQL Server instance name
    }
  }
  
  module.exports = config;
  