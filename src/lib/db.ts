import mongoose from "mongoose";
const mongoDbUrl = process.env.MONGODB_URI;

if (!mongoDbUrl) throw new Error("MONGODB_URI is not defined");
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommand: true,
      maxPoolSize: 50,
    };

    cached.promise = mongoose
      .connect(mongoDbUrl, options)
      .then(() => mongoose.connection);

    cached.conn = await cached.promise;
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
  }
  return cached.conn;
};

export default dbConnect;
