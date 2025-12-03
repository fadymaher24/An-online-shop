import mongoose, { Schema, Document } from 'mongoose';

export interface OrderDocument extends Document {
  : string;
  price: number;
  description: string;
  imageUrl: string;
  userId: Schema.Types.ObjectId;
}

const productSchema = new Schema<ProductDocument>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Mongoose will automatically create a collection called 'products' based on the model name 'Product'
export default mongoose.model<ProductDocument>('Product', productSchema);
