const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toDateString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;