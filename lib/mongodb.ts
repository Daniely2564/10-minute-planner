import { connect, Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

let clientPromise: Promise<Mongoose>;

declare global {
  var _mongoClientPromise: Promise<Mongoose>;
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to avoid reconnecting every request
  if (!global._mongoClientPromise) {
    if (typeof connect === "function") {
      global._mongoClientPromise = connect(MONGODB_URI);
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = connect(MONGODB_URI);
}

export default clientPromise;
