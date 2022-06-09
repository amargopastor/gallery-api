import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { Image } from './Image.model';

type GetType = FastifyRequest<{Params: { _id: string}}>;
type PostType = FastifyRequest<{Body: { _id:string, file: string, title: string, description: string }}>;

// C(R)UD: List all images
const list_images = async (request: FastifyRequest, reply: FastifyReply) => {
  await Image.find().lean().then((data)=>{
    reply.code(200).send(data);
    request.log.info(`✅ All images found`);
  }).catch((error) => {
    reply.code(500).send({ message: error });
    request.log.info(`❌ Images not found`);
  });
  return reply;
};

// C(R)UD: Get the details of a images
const get_image = async (request: GetType, reply: FastifyReply) => {
  const _id = request.params._id;

  // Check we have a valid formatted objectid
  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Please, pass an object id as route param');
  }

  await Image.findById(_id).lean().then((data)=>{
    if (data) {
      reply.code(200).send(data);
      request.log.info(`✅ Found image ${_id}`);
    } else {
      reply.code(404).send({ message: `Image with id ${_id} not found` });
      request.log.info(`❌ Image with id ${_id} not found`);
    }
    return reply;
  })
};

// (C)RUD: Add new image
const new_image = async (request: PostType, reply: FastifyReply) => {
  await Image.create(request.body).then((data) => {
    reply.code(200).send(data);
    request.log.info(`✅ New image ${request.body.file} created`);
  }).catch((error) => {
    reply.code(500).send({ message: error });
    request.log.info(`❌ Could not create new image ${request.body.file}`);
  });
  return reply;
};

// CR(U)D: Update image
const update_image = async (request: PostType, reply: FastifyReply) => {
  const _id = request.body._id;

  // Check we have a valid formatted objectid
  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Please, pass an object id as route param');
  }
  
  Image.findByIdAndUpdate(_id, request.body).lean().then((data)=>{
    if (data) {
      const new_data = { ...data, ...(request.body) };
      reply.code(200).send(new_data);
    } else {
      reply.code(404).send({ message: `user with id ${_id} not found` });
    }
  }).catch((error) => {
    reply.code(500).send({ message: error });
    request.log.info(`❌ Could not update image ${request.body.file}`);
  });
  
  return reply;
};

// CRU(D): Delete all images
const delete_all_image = async (request: FastifyRequest, reply: FastifyReply) => {
  await Image.deleteMany().lean().then((data)=>{
    if (data) {
      reply.code(200).send(data);
    } else {
      reply.code(404).send({ message: `All images has been deleted` });
    }
    request.log.info(`✅ All images has been deleted`);
    return reply;
  })
};

// CRU(D): Delete a image
const delete_image = async (request: GetType, reply: FastifyReply) => {
  const _id = request.params._id;

  // Check we have a valid formatted objectid
  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('Please, pass an object id as route param');
  }

  await Image.findByIdAndDelete(_id).lean().then((data)=>{
    if (data) {
      reply.code(200).send(data);
      request.log.info(`✅ Deleted image ${_id}`);
    } else {
      reply.code(404).send({ message: `Image with id ${_id} not found` });
      request.log.info(`❌ Image with id ${_id} not found`);
    }
    return reply;
  })
};


const images_router: FastifyPluginAsync = async (app) => {
  app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
  });
  app.get('/', list_images);
  app.get('/:_id', get_image);
  app.post('/', new_image);
  app.post('/:_id', update_image);
  app.delete('/', delete_all_image);
  app.delete('/:_id', delete_image);
};

export default images_router;