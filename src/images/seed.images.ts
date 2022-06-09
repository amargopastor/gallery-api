import { DocumentDefinition } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { ImageDocument, Image } from './Image.model';
import { prepare_db } from '../bd';

const images: DocumentDefinition<ImageDocument>[] = [
  {
    file: 'demo1.png',
    title: "Demo 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userID: "1"
  },
  {
    file: 'demo2.png',
    title: "Demo 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userID: "1"
  },
  {
    file: 'demo3.png',
    title: "Demo 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userID: "1"
  },
];

(async () => {
  // Connect to database
  const { close_connection } = await prepare_db();

  // Delete all previous images if collection exists previously
  try {
    await Image.collection.drop();
    console.log('✅ Deleted all previous images');
  } catch (error) {
    const e = error as MongoServerError;
    if (e.codeName === 'NamespaceNotFound') {
      console.log('❌ Collection does not exist, cannot drop');
    }
  }

  // Create all bottlecaps
  const docs = await Promise.all(
    images.map(async (r) => {
      const bc_doc = await Image.create(r);
      return bc_doc;
    }),
  );

  console.log(`✅ Created ${docs.length} images`);

  // Close db
  await close_connection();
})();