import mongoose from "mongoose";
const mongoDbUrl = process.env.DB_URL!;

if (!mongoDbUrl) throw new Error("DB_URL is not defined");
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoDbUrl)
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
