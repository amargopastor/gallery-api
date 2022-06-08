import {
    Schema, Document, Types, model,
  } from 'mongoose';
  
  export interface ImagesDocument extends Document {
    file: string;
    title: string;
    description: string;
    userID: string;
  }
  
  // The restaurant schema
  const schema = new Schema(
    {
      file: { type: String, required: true, unique: true,  minlength: [3, 'File name min length 3'] },
      title: { type: String, required: true,  minlength: [3, 'Title min length 3'] },
      description: { type: String, required: true,  minlength: [3, 'Description min length 3'] },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
  );
  
  // Mongoose model for images schema
  export const Images = model('image', schema);