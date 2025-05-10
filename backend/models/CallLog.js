const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Call direction
  direction: {
    type: String,
    enum: ['outgoing', 'incoming'],
    required: true,
  },
  
  // Call type: audio or video as per requirements
  callType: {
    type: String,
    enum: ['call', 'video call'],
    required: true,
  },
  
  // Call status tracking as per requirements
  status: {
    type: String,
    enum: ['missed', 'received', 'ended'],
    required: true,
  },
  
  // Call state transitions for detailed tracking
  stateTransitions: [
    {
      state: {
        type: String,
        enum: ['calling', 'ringing', 'start', 'end'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  
  // Call timing
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  
  // Call duration in seconds
  duration: {
    type: Number,
    default: 0,
  },
  
  // Destination/remote party number
  destinationNumber: {
    type: String,
    required: true,
  },
  
  // SIP call ID
  sipCallId: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to add state transition
CallLogSchema.methods.addStateTransition = async function (state) {
  // Add the new state transition
  this.stateTransitions.push({
    state,
    timestamp: new Date(),
  });
  
  // Update start and end times based on state
  if (state === 'start') {
    this.startTime = new Date();
  } else if (state === 'end' && this.startTime) {
    this.endTime = new Date();
    // Calculate duration in seconds
    this.duration = Math.floor((this.endTime - this.startTime) / 1000);
    
    // Update status to 'ended' if call was previously received
    if (this.status === 'received') {
      this.status = 'ended';
    }
  }
  
  await this.save();
  return this;
};

// Method to get current state
CallLogSchema.methods.getCurrentState = function () {
  if (this.stateTransitions.length === 0) {
    return null;
  }
  return this.stateTransitions[this.stateTransitions.length - 1].state;
};

module.exports = mongoose.model('CallLog', CallLogSchema);