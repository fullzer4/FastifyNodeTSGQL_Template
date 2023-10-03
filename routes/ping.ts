import { Type } from '@sinclair/typebox';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

const plugin: FastifyPluginAsyncTypebox = async function(fastify, _opts) {
  fastify.get('/', {
    schema: {
      querystring: Type.Object({
        docs: Type.String({ default: 'Pong' })
      }),
      response: {
        200: Type.Object({
          res: Type.String()
        })
      }
    }
  }, (req) => {
    const { docs } = req.query;
    return { res: docs };
  });
}

export default plugin;