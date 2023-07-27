import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config();

let mySQL = mysql.createConnection({
    host: process.env.MY_SQL_OST,
    user: process.env.MY_SQL_USER_NAME,
    password: process.env.MY_SQL_USER_PASSWORD,
    database: process.env.MY_SQL_USER_DATABASE_NAME
});

function mysqlConnect() {
    try {
        mySQL.connect(err => {
            if (err) {
                console.error('MySQL error: ' + err.sqlMessage);
                return;
            } else {
                console.log("Connect MySQL success!")
            }
        })
    } catch (err) {
        console.log("Syntax error")
    }
}

module.exports = {
    mysqlConnect,
    mySQL
}
