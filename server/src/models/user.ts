import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //unique speeds up query
  password: { type: String, required: true, minlength: 5 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});

userSchema.plugin(uniqueValidator); //makes sure that the email can only exist once in the DB

interface UserDoc {
  name: string;
  email: string;
  password: string;
  image: string;
  places: mongoose.Types.ObjectId[] | []
}

export const userModel = model<UserDoc>("User", userSchema);
