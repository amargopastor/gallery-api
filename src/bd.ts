import { FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';
import { DB_URL } from './config';

// An utility function to reuse connection config
export const prepare_db = async () => {
  await mongoose.connect(DB_URL);
  const close_connection = () => mongoose.disconnect();
  return { close_connection };
};

// Plugin to be used as a fastify app
export const db_plugin: FastifyPluginAsync = async (app) => {
  await prepare_db();
  app.log.info(`Database ready ${DB_URL}`);
};
