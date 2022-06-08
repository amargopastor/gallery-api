import { FastifyPluginAsync } from 'fastify';
import { Types } from 'mongoose';
import { Images } from './Images.model';

export const images_api: FastifyPluginAsync = async (app) => {
  // C(R)UD: List all images
  app.get('/', async () => {
    // Get all images
    const images_docs = await Images.find();

    return images_docs;
  });

  // C(R)UD: Get the details of a images
  app.get<{ Params: { image_id: string } }>(
    '/:image_id',
    async (req, res) => {
      const { image_id } = req.params;

      // Check we have a valid formatted objectid
      if (!Types.ObjectId.isValid(image_id)) {
        throw new Error('Please, pass an object id as route param');
      }

      // Find the image by id
      const doc = await Images.findById(image_id);

      // Check if image are found
      if (doc) {
        // Return the image
        return doc.toObject();
      }
      res.status(404);
      return { status: 'image not found' };
    },
  );

  // CRU(D): Delete a image
  app.delete<{ Params: { image_id: string } }>(
    '/:image_id',
    async (req) => {
      const { image_id } = req.params;

      // Check we have a valid formatted objectid
      if (!Types.ObjectId.isValid(image_id)) {
        throw new Error('Please, pass an object id as route param');
      }

      await Images.findByIdAndDelete(image_id);
      req.log.info(`Deleted image ${image_id}`);

      return { staus: 'deleted', image_id };
    },
  );
};