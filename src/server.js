const Hapi = require('@hapi/hapi');
const routes = require('moment/src/Routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server akan berjalan pada ${server.info.uri}`);
};

init();