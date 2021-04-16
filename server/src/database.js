import mysql from 'mysql';

const connection = mysql.createConnection({
    host: '34.82.64.99',
    user: 'hapi-server',
    password:'hapi',
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