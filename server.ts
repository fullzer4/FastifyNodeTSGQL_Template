import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

export function build () {

  const server = Fastify();

  server.register(Swagger);
  server.register(SwaggerUI);

  server.register(fastifyCors, {
    origin: '*'
  });

  server.register(AutoLoad, {
    dir: `${__dirname}/routes`,
  });

  return server
}