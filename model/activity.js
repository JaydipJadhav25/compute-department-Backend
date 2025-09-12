import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

export const Activity = mongoose.model('Activity', activitySchema);


