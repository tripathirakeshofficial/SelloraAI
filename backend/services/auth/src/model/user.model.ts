import mongoose from "mongoose";

interface ISocialLinks {
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface IPartnerProfile {
  slug?: string;
  bio?: string;
  website?: string;
  socialLinks?: ISocialLinks;
}

interface IPaymentDetails {
  method: "upi" | "bank";
  upiId?: string;
  accountHolderName?: string;
  accountHolderNumber?: string;
  ifscCode?: string;
}

export interface IUser {
  firebaseUid: string;
  name: string;
  email: string;
  role: "partner" | "admin";
  partnerProfile: IPartnerProfile;
  paymentDetails: IPaymentDetails;
  totalSales: number;
  totalRevenue: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB schema for users, partners, and their marketplace profile data.
const userSchema = new mongoose.Schema<IUser>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["partner", "admin"],
      default: "partner",
      index: true,
    },
    partnerProfile: {
      slug: {
        type: String,
        unique: true,
        index: true,
        sparse: true,
      },
      bio: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
      socialLinks: {
        youtube: {
          type: String,
          default: "",
        },
        instagram: {
          type: String,
          default: "",
        },
        linkedin: {
          type: String,
          default: "",
        },
        github: {
          type: String,
          default: "",
        },
      },
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ["upi", "bank"],
        default: "upi",
      },
      upiId: {
        type: String,
        default: "",
      },
      accountHolderName: {
        type: String,
        default: "",
      },
      accountHolderNumber: {
        type: String,
        default: "",
      },
      ifscCode: {
        type: String,
        default: "",
      },
    },
    totalSales: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Reuse a single Mongoose model for the User collection.
const User = mongoose.model<IUser>("User", userSchema);

export default User;
