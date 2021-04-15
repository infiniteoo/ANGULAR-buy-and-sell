import Hapi from '@hapi/hapi';
import routes from './routes';
import {db} from './database';

let server;

const start = async () => {
    let server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    routes.forEach(route => server.route(route));
    db.connect();
    await server.start();
    console.log(`server is listening on ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('Stropping server...');
  await server.stop({ timeout: 1000 });
  db.end();
  console.log('server stopped.');
  process.exit(0);

});

start();





