const mongoose = require("mongoose")
const Message = require("./Message")

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true })

// Cascade delete messages when a room is deleted
roomSchema.pre("deleteOne", { document: true, query: false }, async function(next) {
  try {
    await Message.deleteMany({ room: this._id })
    next()
  } catch (err) {
    next(err)
  }
})


module.exports = mongoose.model("Room", roomSchema)
