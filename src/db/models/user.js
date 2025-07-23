import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', userSchema);

// name - string, required
// email - string, email, unique, required
// password - string, required
// createdAt - дата створення
// updatedAt - дата оновлення
