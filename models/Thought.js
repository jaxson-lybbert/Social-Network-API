const { Schema } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      timestamps: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: reactionSchema,
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new ObjectId(),
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
    timestamps: true,
  },
});

module.exports = { thoughtSchema, reactionSchema };
