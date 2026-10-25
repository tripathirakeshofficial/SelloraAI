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
  _id?: string;
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
