import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hapi-server',
    password:'abc123',
    database: 'buy-and-sell'
});

export const db = {
    connect: () => connection.connect(),
    query: (queryString, escapedValues) => 
        new Promise((resolved, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolved({results, fields});
            })
        }),
    end: () => connection.end(),
}