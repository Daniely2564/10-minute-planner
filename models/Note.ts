import { User } from "@custom/types/models";
import mongoose, { Model, Document } from "mongoose";

const { Schema } = mongoose;

export interface NoteModelSchema {
  id: number;
  title: string;
  note: string;
  user: Document<User>["_id"];
  shared: boolean;
  verses: {
    id: string;
    verse: string;
  }[];
}

const noteSchema = new Schema<NoteModelSchema>(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shared: {
      type: Boolean,
      default: false,
    },
    verses: [Number],
  },
  { timestamps: true }
);

const Note =
  (mongoose.models?.Note as Model<NoteModelSchema>) ||
  mongoose.model<NoteModelSchema, Model<NoteModelSchema>>("Note", noteSchema);

export { Note };
