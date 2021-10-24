import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //unique speeds up query
  password: { type: String, required: true, minlength: 5 },
  image: { type: String, required: true },
  places: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //makes sure that the email can only exist once in the DB

interface UserDoc {
  name: string;
  email: string;
  password: string;
  image: string;
  places: string;
}

export const userModel = model<UserDoc>("User", userSchema);
