const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [-81.30092449999999,29.0335139]
    }
  });

  module.exports = pointSchema;