import { FastifyPluginAsync } from 'fastify';
import blipp from 'fastify-blipp';
import fastifyCors from "@fastify/cors";
import { images_api } from './images/images.api';
import { main_router } from './routers/main_router';
import { db_plugin } from './bd';

export const main_app: FastifyPluginAsync = async (app) => {
  // Register blipp to see routes when starting the server
  await app.register(blipp);
  await app.register(fastifyCors);

  /* Do not await this plugin, it will cause whole app to wait
  for db connection, mongoose already does that in the background. */
  app.register(db_plugin);

  // Load the plugins of this
  await app.register(main_router);
  await app.register(images_api, { prefix: '/images' });

  // when app starts, blip the installed routes on terminal
  app.blipp();
};
