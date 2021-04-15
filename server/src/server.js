import Hapi from '@hapi/hapi';

const start = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: "/hello",
        handler: (req, h) => {
            return 'hello!';
        }
    })

    await server.start();
    console.log(`server is listening on ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

start();





