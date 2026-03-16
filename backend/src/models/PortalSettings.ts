import mongoose, { Schema, Document } from "mongoose";

export interface IPortalSettings extends Document {
  siteName: string;
  tagline?: string;
  supportEmail?: string;
  supportPhone?: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  enableSocialLogin: boolean;
  maintenanceMode: boolean;
  allowGuestCheckout: boolean;
  enableChat: boolean;
  enableNotifications: boolean;
  maxFileUploadSizeMb: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortalSettingsSchema = new Schema<IPortalSettings>(
  {
    siteName: { type: String, default: "Winsume Lift Portal" },
    tagline: String,
    supportEmail: String,
    supportPhone: String,
    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: false },
    enableSocialLogin: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    allowGuestCheckout: { type: Boolean, default: true },
    enableChat: { type: Boolean, default: true },
    enableNotifications: { type: Boolean, default: true },
    maxFileUploadSizeMb: { type: Number, default: 25 }
  },
  { timestamps: true }
);

export const PortalSettings = mongoose.model<IPortalSettings>("PortalSettings", PortalSettingsSchema);

