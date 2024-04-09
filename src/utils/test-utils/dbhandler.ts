import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer =  MongoMemoryServer.create();

export const dbConnect = async () => {
  
  const uri = await (await mongoServer).getUri();
  await mongoose.connect(uri);
}


export const dbDisconnect = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongoServer).stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
     const collection = collections[key];
     await collection.deleteMany({});
  }
}
