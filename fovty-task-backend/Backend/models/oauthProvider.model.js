import mongoose from "mongoose";

const oauthProviderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  provider: {
    type: String,
    required: true
  },

  providerId: {
    type: String,
    required: true
  }

},
{ timestamps: true }
);

const OAuthProvider = mongoose.model("OAuthProvider", oauthProviderSchema);

export default OAuthProvider;