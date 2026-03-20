import mongoose from "mongoose";

const impersonationLogSchema = new mongoose.Schema(
{
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  endedAt: {
    type: Date
  }
},
{ timestamps: true }
);

const ImpersonationLog = mongoose.model(
  "ImpersonationLog",
  impersonationLogSchema
);

export default ImpersonationLog;