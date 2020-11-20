const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  weight: Number,
  goal: Number,
  favourite: [{type: Schema.Types.ObjectId,ref:'Exercise'}],
  completed: [],
  imgPath:{ type: String, default: "/images/foto-perfil.jpg"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;