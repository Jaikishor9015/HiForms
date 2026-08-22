const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  reward: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
